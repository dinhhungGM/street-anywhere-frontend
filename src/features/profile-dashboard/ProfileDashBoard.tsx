import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';
import SweetAlert from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { authSelectors } from '../auth/store';
import _ from 'lodash';
import { AppIcon } from '../../solutions/components/app-icon';
import { AddAPhoto, Diversity1, AddReaction, Comment, Bookmark } from '@mui/icons-material';
import { AppInfoWidget } from '../../solutions/components/app-info-widget';

const ProfileDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);

  useEffect(() => {
    if (_.isNil(currentUser)) {
      navigate('/sign-in');
    } else {
      console.log('currentUser', currentUser);
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
            <Avatar className={styles['dashboard-user-avatar']} />
            <Box marginLeft={3}>
              <Typography variant='h5' fontWeight={700}>
                {currentUser?.fullName}
              </Typography>
              <Typography>0 Followers</Typography>
            </Box>
          </Box>
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
            <AppInfoWidget icon={Diversity1} title='Followers' iconColor='#44ff00' value={21321321} replaceText='9999+' />
            <AppInfoWidget icon={AddReaction} title='Reactions' iconColor='#fbe44b' value={3} />
            <AppInfoWidget icon={Comment} title='Comments' value={4} />
            <AppInfoWidget icon={Bookmark} title='Bookmarks' iconColor='#0288d1' value={5} />
          </Stack>
        </Box>
        <Box padding={4}>
          <Grid container>
            <Grid item sm={12} md={4}>
              <Box component={Paper} elevation={2} padding={2}>
                About
              </Box>
            </Grid>
            <Grid item sm={12} md={8}>
              <Box padding={2}>My posts</Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDashBoard;
