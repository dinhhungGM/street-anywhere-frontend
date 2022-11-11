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

const ProfileDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const posts = useAppSelector(profileSelectors.selectPostsOfCurrentUser);

  useEffect(() => {
    if (_.isNil(currentUser)) {
      navigate('/sign-in');
    } else {
      dispatch(profileAsyncActions.getAllPostsOfCurrentUser(currentUser.id));
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
          }}
        >
          <Button
            startIcon={<AppIcon icon={AddAPhoto} color='#fff' />}
            variant='contained'
            className={styles['dashboard-add-cover-image']}
          >
            Add cover image
          </Button>
        </Box>
        <Box className={styles['dashboard-user']}>
          <Box className={styles['dashboard-user-info']}>
            <Box
              sx={{
                position: 'relative',
              }}
            >
              <Avatar className={styles['dashboard-user-avatar']} />
              <IconButton size='medium' className={styles['dashboard-user-upload']} color='error'>
                <AppIcon icon={Upload} color='#fff' />
              </IconButton>
            </Box>
            <Box marginLeft={3}>
              <Typography variant='h5' fontWeight={700}>
                {currentUser?.fullName}
              </Typography>
              <Typography>0 Followers</Typography>
            </Box>
          </Box>
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
            <AppInfoWidget icon={Diversity1} title='Followers' iconColor='#44ff00' value={2} />
            <AppInfoWidget icon={AddReaction} title='Reactions' iconColor='#fbe44b' value={3} />
            <AppInfoWidget icon={Comment} title='Comments' value={4} />
            <AppInfoWidget icon={Bookmark} title='Bookmarks' iconColor='#0288d1' value={5} />
          </Stack>
        </Box>
        <Box>
          <Grid container>
            <Grid item sm={12} md={4}>
              <Box component={Paper} elevation={2} padding={2}>
                <Typography textAlign='center' marginBottom={2}>
                  Description
                </Typography>
                <Divider />
              </Box>
            </Grid>
            <Grid item sm={12} md={8}>
              <Box paddingY={2}></Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDashBoard;
