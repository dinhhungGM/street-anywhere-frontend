import { Close, Delete, Search, Shortcut } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppIconButton } from '../../../solutions/components/app-icon-button';
import { authSelectors } from '../../auth/store';
import { wrapperActions } from '../../wrapper/store';
import { profileActions, profileSelectors } from '../index';
import { userActions, userSelectors } from './../../user';
import styles from './styles.module.scss';

const showWarning = () =>
  SweetAlert.fire({
    title: 'Warning',
    icon: 'info',
    text: 'You are not logged in. Please login to continue',
    confirmButtonText: 'Sign in',
    showCancelButton: true,
  });

const ProfileListBookmarkedPost = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const bookmarkedPosts = useAppSelector(profileSelectors.selectBookmarkedPosts);
  const followingUsers = useAppSelector(userSelectors.selectedFollowingUsers);

  // Navigate to post detail
  const navigateToPostDetail = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  // Handling remove bookmarked post
  const handleRemoveBookmarkedPost = (bookmarkId: number) => {
    dispatch(profileActions.removeBookmarkedPost(bookmarkId));
  };

  // Load bookmarked posts
  useEffect(() => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'You are not logged in. Please login to continue',
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate('/sign-in');
        } else {
          navigate(-1);
        }
      });
    } else if (currentUser?.id !== +userId) {
      SweetAlert.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Can not access collection of another user',
      }).then((rs) => {
        navigate(-1);
      });
    } else {
      dispatch(profileActions.getListBookmarkedPosts(+userId));
      dispatch(userActions.getFollowingUsers(+userId));
    }
  }, [userId]);

  // Clear data before exiting
  useEffect(() => {
    return () => {
      dispatch(profileActions.resetListBookmarkedPosts());
    };
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearch('');
  }, []);

  // Handling filter search

  const displayPosts = useMemo(() => {
    const posts = _.map(bookmarkedPosts, (item) => {
      const followingUser = _.find(followingUsers, (i) => i.followerId === item.userId);
      return {
        ...item,
        isFollowingUser: !!followingUser,
        followingDetail: followingUser,
      };
    });
    if (!search.trim()) {
      return posts;
    }
    return _.filter(posts, (post) => {
      const title = post.title.trim().toLowerCase();
      const keyword = search.trim().toLowerCase();
      return title.includes(keyword);
    });
  }, [search, bookmarkedPosts, followingUsers]);

  // Handle follow user
  const handleFollowUser = (post) => {
    if (!currentUser) {
      showWarning().then((rs) => {
        if (rs.isConfirmed) {
          navigate('/sign-in');
        }
      });
    } else {
      if (post.isFollowingUser) {
        dispatch(
          userActions.unfollowUser({
            userId: post?.followingDetail?.userId,
            followerId: post?.followingDetail?.followerId,
          }),
        );
      } else {
        dispatch(userActions.followUser({ userId: currentUser?.id, followerId: post?.userId }));
        if (currentUser?.id !== post?.userId) {
          dispatch(
            wrapperActions.createNewNotification({
              postId: post?.id,
              userId: currentUser?.id,
              type: 'followed',
              reactionType: null,
            }),
          );
        }
      }
    }
  };
  return (
    <>
      <Container className={styles.bookmarked}>
        {bookmarkedPosts?.length ? (
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
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6 }} spacing={2}>
            {displayPosts?.map((post) => (
              <Card key={post?.id} className='card'>
                <CardHeader
                  title={post?.fullName}
                  subheader={post?.createdAt}
                  sx={{ cursor: 'pointer' }}
                  onClick={() => navigate(`/profile/${post?.userId}`)}
                  avatar={<Avatar src={post?.profilePhotoUr1l}>{post?.fullName[0]}</Avatar>}
                  action={
                    currentUser?.id !== post?.userId ? (
                      <Button
                        variant='contained'
                        color={post?.isFollowingUser ? 'error' : 'primary'}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFollowUser(post);
                        }}
                        sx={{ ml: 1 }}>
                        {post?.isFollowingUser ? 'Unfollow' : 'Follow'}
                      </Button>
                    ) : null
                  }
                />
                <CardActionArea
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToPostDetail(post?.id);
                  }}
                  sx={{ padding: 0.5 }}>
                  {post?.type === 'video' ? (
                    <ReactPlayer
                      url={post?.videoYtbUrl}
                      light
                      controls={false}
                      muted
                      width='100%'
                      height='300px'
                    />
                  ) : (
                    <CardMedia
                      component='img'
                      height='300'
                      image={post?.imageUrl}
                      alt={post?.shortTitle}
                    />
                  )}
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant='h5'
                      fontWeight={700}
                      className={styles.title}
                      margin={0}>
                      {post?.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Divider />
                <CardActions>
                  <Stack
                    direction='row'
                    alignItems='center'
                    justifyContent='space-between'
                    width='100%'
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
                      color='error'
                      variant='contained'
                      className={styles.btn}
                      startIcon={<AppIcon icon={Delete} color='#fff' />}
                      onClick={() => handleRemoveBookmarkedPost(post?.bookmarkId)}>
                      Remove
                    </Button>
                  </Stack>
                </CardActions>
              </Card>
            ))}
          </Masonry>
        ) : (
          <Stack alignItems='center' justifyContent='center'>
            <img src='/empty-data.jpg' alt='Empty Data' />
          </Stack>
        )}
      </Container>
    </>
  );
};

export default ProfileListBookmarkedPost;
