import { AddAPhoto, AddReaction, Bookmark, Comment, Diversity1, Upload } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppIcon } from '../../solutions/components/app-icon';
import { AppInfoWidget } from '../../solutions/components/app-info-widget';
import { authSelectors } from '../auth/store';
import styles from './styles.module.scss';
import * as profileAsyncActions from './profileDashboardAsyncActions';
import * as profileSelectors from './profileDashBoardSelectors';
import { MyPost } from './my-post';

const ProfileDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const posts = useAppSelector(profileSelectors.selectPostsOfCurrentUser);
  const profileDetail = useAppSelector(profileSelectors.selectProfileDetail);


  useEffect(() => {
    if (_.isNil(currentUser)) {
      navigate('/sign-in');
    } else {
      dispatch(profileAsyncActions.getAllPostsOfCurrentUser(currentUser.id));
      dispatch(profileAsyncActions.getProfileOfUser(currentUser.id));
    }
  }, []);

  return (
    <>
      <Box className={styles['dashboard']}>
        <Box
          sx={{
            height: '400px',
            background: '#ccc',
            borderRadius: 4,
            position: 'relative',
          }}>
          <Button
            startIcon={<AppIcon icon={AddAPhoto} color='#fff' />}
            variant='contained'
            className={styles['dashboard-add-cover-image']}>
            Add cover image
          </Button>
        </Box>
        <Box className={styles['dashboard-user']}>
          <Box className={styles['dashboard-user-info']}>
            <Box
              sx={{
                position: 'relative',
              }}>
              <Avatar className={styles['dashboard-user-avatar']} />
              <IconButton size='medium' className={styles['dashboard-user-upload']} color='error'>
                <AppIcon icon={Upload} color='#fff' />
              </IconButton>
            </Box>
            <Box
              marginLeft={3}
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                },
              }}>
              <Typography variant='h5' fontWeight={700}>
                {currentUser?.fullName}
              </Typography>
              <Typography>0 Followers</Typography>
            </Box>
          </Box>
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='center' paddingY={2}>
            <AppInfoWidget icon={Diversity1} title='Followers' iconColor='#44ff00' value={2} />
            <AppInfoWidget icon={AddReaction} title='Reactions' iconColor='#fbe44b' value={2} />
            <AppInfoWidget icon={Comment} title='Comments' value={profileDetail?.commentCount} />
            <AppInfoWidget icon={Bookmark} title='Bookmarks' iconColor='#0288d1' value={5} />
          </Stack>
        </Box>
        <Box
          sx={{
            backgroundColor: '#f2f5f8',
            padding: '16px',
            borderRadius: '8px',
          }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <Box component={Paper} elevation={2} padding={2}>
                <Typography textAlign='center' marginBottom={2}>
                  Description
                </Typography>
                <Divider />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={8}>
              <Box>
                {posts?.map((post) => (
                  <MyPost
                    key={post.id}
                    tags={post.tags}
                    postId={post.id}
                    viewCount={post.views}
                    typeOfMedia={post.type}
                    latitude={post.latitude}
                    location={post.location}
                    createdAt={post.createdAt}
                    longitude={post.longitude}
                    shortTitle={post.shortTitle}
                    categories={post.categories}
                    description={post.description}
                    commentCount={post.commentCount}
                    fullName={currentUser?.fullName}
                    bookmarkCount={post.bookmarkCount}
                    reactionCount={post.reactionCount}
                    mediaUrl={post.type === 'image' ? post.imageUrl : post.videoYtbUrl}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDashBoard;
