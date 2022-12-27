import { Bookmark, Close, Delete, Edit, Search, Shortcut } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { profileActions, profileSelectors } from '..';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppHeading } from '../../../solutions/components/app-heading';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppIconButton } from '../../../solutions/components/app-icon-button';
import { AppMoreMenu } from '../../../solutions/components/app-more-menu';
import { IPost } from '../../../solutions/models/postModels';
import { authSelectors } from '../../auth/store';
import { bookmarkActions } from '../../bookmark';
import { userActions, userSelectors } from '../../user';
import { wrapperActions } from '../../wrapper/store';
import styles from './styles.module.scss';

const ProfileListPosts = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const contentRef = useRef();
  const myPosts = useAppSelector(profileSelectors.selectMyPosts);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const bookmarkedPosts = useAppSelector(userSelectors.selectBookmarkedPosts);

  const isCreator = useMemo(() => {
    return currentUser?.id === +userId;
  }, [currentUser]);

  const getHeading = (): string => {
    const mediaType = searchParams.get('mediatype');
    return mediaType === 'image' ? `Images (${ myPosts?.length })` : `Videos (${ myPosts?.length })`;
  };

  // Navigate to post detail
  const navigateToPostDetail = (postId: number) => {
    navigate(`/posts/${ postId }`);
  };

  // Navigate to edit page
  const navigateToEditPage = (postId: number) => {
    navigate(`/profile/${ currentUser?.id }/update-post/${ postId }`);
  };

  // Handling delete post
  const handleDeletePost = (postId: number): void => {
    SweetAlert.fire({
      title: 'Confirm',
      icon: 'question',
      text: 'Are you sure to remove this post?',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      confirmButtonColor: '#e60023',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(profileActions.deletePostById(postId));
      }
    });
  };

  // Handling get posts by media type
  useEffect(() => {
    const mediaType = searchParams.get('mediatype');
    setSearch('');
    dispatch(profileActions.getPostsOfUser({ userId: +userId, mediaType }));
    const timer = setTimeout(() => {
      if (contentRef.current) {
        (contentRef.current as any).scrollIntoView();
      }
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [searchParams]);

  // Handling get bookmarked posts
  useEffect(() => {
    if (currentUser && currentUser?.id === +userId) {
      dispatch(userActions.getBookmarkedPost(currentUser?.id));
    }
  }, [currentUser]);

  // Construct display posts
  const originalPosts = useMemo(() => {
    if (!bookmarkedPosts || !bookmarkedPosts.length) {
      return myPosts;
    }
    return _.map(myPosts, (post) => {
      const data = _.find(bookmarkedPosts, (item) => item.postId === post.id);
      return {
        ...post,
        bookmarkedDetail: data,
        isBookmarked: !!data,
      };
    });
  }, [currentUser, myPosts, bookmarkedPosts]);

  // Constructing display posts
  const displayPosts = useMemo(() => {
    if (!search || !search.trim()) {
      return originalPosts;
    }
    return _.filter(originalPosts, (post) => {
      const title = post.title.trim().toLowerCase();
      const keyword = search.trim().toLowerCase();
      return title.includes(keyword);
    });
  }, [search, originalPosts]);

  // Handling bookmark post
  const handleBookmark = (post: IPost) => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Notification',
        icon: 'warning',
        text: 'You are not sign in',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/sign-in');
        }
      });
    } else {
      if (post.isBookmarked) {
        dispatch(bookmarkActions.unBookmark({ bookmarkId: post?.bookmarkedDetail.bookmarkId }));
      } else {
        dispatch(
          bookmarkActions.createBookmark({
            postId: post?.id,
            userId: currentUser?.id,
          }),
        );
        dispatch(
          wrapperActions.createNewNotification({
            postId: post?.id,
            type: 'bookmarked',
            reactionType: null,
            userId: currentUser?.id,
          }),
        );
      }
    }
  };

  // Reset my post
  useEffect(() => {
    return () => {
      dispatch(profileActions.resetMyPosts());
    };
  }, []);

  // Handling clear search
  const clearSearch = useCallback(() => {
    setSearch('');
  }, []);

  return (
    <>
      <Container className={styles.images}>
        <AppHeading heading={getHeading()} />
        {myPosts?.length ? (
          <Box marginY={2}>
            <TextField
              placeholder='Search by title'
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AppIcon icon={Search} />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position='start'>
                    <AppIconButton
                      tooltip='Clear'
                      icon={<AppIcon icon={Close} />}
                      buttonColor='error'
                      onClick={clearSearch}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        ) : null}
        {displayPosts?.length ? (
          <>
            <Divider />
            <Box ref={contentRef}>
              <Masonry
                columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
                spacing={2}
                sx={{
                  width: '100%',
                  marginTop: '12px',
                  paddingLeft: '60px',
                }}>
                {displayPosts?.map((post) => (
                  <Card sx={{ maxWidth: 345 }} key={post?.id}>
                    <CardHeader
                      title={post?.title}
                      subheader={post?.createdAt}
                      action={
                        isCreator ? (
                          <>
                            <AppMoreMenu isOpenInside>
                              <MenuItem onClick={() => navigateToEditPage(post?.id)}>
                                <AppIcon icon={Edit} />
                                <Typography marginLeft={2}>Edit</Typography>
                              </MenuItem>
                              <MenuItem onClick={() => handleDeletePost(post?.id)}>
                                <AppIcon icon={Delete} />
                                <Typography marginLeft={2}>Delete</Typography>
                              </MenuItem>
                            </AppMoreMenu>
                          </>
                        ) : null
                      }
                    />
                    <CardActionArea
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateToPostDetail(post?.id);
                      }}
                      sx={{ p: 0.5 }}>
                      {post?.type === 'video' ? (
                        <ReactPlayer
                          url={post?.videoYtbUrl}
                          light
                          controls={false}
                          muted
                          width='100%'
                        />
                      ) : (
                        <CardMedia
                          component='img'
                          height='300'
                          image={post?.imageUrl}
                          alt={post?.shortTitle}
                        />
                      )}
                    </CardActionArea>
                    <Divider />
                    <CardActions>
                      <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                        width='100%'
                        paddingY={1}
                        spacing={2}>
                        <Button
                          size='small'
                          color='primary'
                          variant='contained'
                          className={styles.btn}
                          startIcon={<AppIcon icon={Shortcut} color='#fff' />}
                          onClick={() => navigateToPostDetail(post?.id)}>
                          View more
                        </Button>
                        <Button
                          size='small'
                          color={post?.isBookmarked ? 'error' : 'primary'}
                          variant={post?.isBookmarked ? 'contained' : 'outlined'}
                          className={styles.btn}
                          startIcon={
                            <AppIcon
                              icon={Bookmark}
                              color={post?.isBookmarked ? '#fff' : '#0288d1'}
                            />
                          }
                          onClick={() => handleBookmark(post)}>
                          {post?.isBookmarked ? 'Unbookmark' : 'Bookmark'}
                        </Button>
                      </Stack>
                    </CardActions>
                  </Card>
                ))}
              </Masonry>
            </Box>
          </>
        ) : (
          <Stack height='100%' alignItems='center' justifyContent='center'>
            <img src='/empty-data.jpg' alt='No data' />
          </Stack>
        )}
      </Container>
    </>
  );
};

export default memo(ProfileListPosts);
