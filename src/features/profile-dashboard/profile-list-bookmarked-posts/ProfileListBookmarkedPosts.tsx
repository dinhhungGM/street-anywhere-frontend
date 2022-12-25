import { Delete, Shortcut } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { authSelectors } from '../../auth/store';
import { profileActions, profileSelectors } from '../index';
import styles from './styles.module.scss';

const ProfileListBookmarkedPost = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const bookmarkedPosts = useAppSelector(profileSelectors.selectBookmarkedPosts);

  // Navigate to post detail
  const navigateToPostDetail = (postId: number) => {
    navigate(`/posts/${ postId }`);
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
    }
  }, [userId]);

  // Clear data before exiting
  useEffect(() => {
    return () => {
      dispatch(profileActions.resetListBookmarkedPosts());
    };
  }, []);
  return (
    <>
      <Container>
        {bookmarkedPosts?.length ? (
          <Masonry
            columns={{ xs: 1, sm: 3, md: 3, lg: 4, xl: 5 }}
            spacing={2}
            sx={{
              width: '100%',
            }}>
            {bookmarkedPosts?.map((post) => (
              <Card sx={{ maxWidth: 345 }} key={post?.id}>
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
