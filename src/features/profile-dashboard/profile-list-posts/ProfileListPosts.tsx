import { Bookmark, Delete, Edit, Shortcut } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardHeader,
  CardMedia,
  Container,
  Divider,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { memo, useEffect, useMemo } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { profileActions, profileSelectors } from '..';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppHeading } from '../../../solutions/components/app-heading';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppMoreMenu } from '../../../solutions/components/app-more-menu';
import { authSelectors } from '../../auth/store';
import styles from './styles.module.scss';

const ProfileListPosts = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const myPosts = useAppSelector(profileSelectors.selectMyPosts);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);

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

  useEffect(() => {
    const mediaType = searchParams.get('mediatype');
    dispatch(profileActions.getPostsOfUser({ userId: +userId, mediaType }));
    return () => {
      dispatch(profileActions.resetMyPosts());
    };
  }, [searchParams]);
  return (
    <>
      <Container className={styles.images}>
        {myPosts?.length ? (
          <>
            <AppHeading heading={getHeading()} />
            <br />
            <Masonry
              columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              spacing={2}
              sx={{
                width: '100%',
              }}>
              {myPosts.map((post) => (
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
                    }}>
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
                        color='primary'
                        variant='outlined'
                        className={styles.btn}
                        startIcon={<AppIcon icon={Bookmark} />}
                        onClick={() => navigateToPostDetail(post?.id)}>
                        Bookmark
                      </Button>
                    </Stack>
                  </CardActions>
                </Card>
              ))}
            </Masonry>
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
