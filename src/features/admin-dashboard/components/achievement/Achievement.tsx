import { Box, Grid, Tab, Tabs } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { AppHeading } from '../../../../solutions/components/app-heading';
import { adminActions, adminSelectors } from '../../store';
import { useEffect } from 'react';
import { AppBarChart } from '../../../../solutions/components/app-bar-chart';

const Achievement = () => {
  const dispatch = useAppDispatch();
  const userMostPost = useAppSelector(adminSelectors.selectTopUserMostPost);
  const userMostFollower = useAppSelector(adminSelectors.selectTopUserMostFollower);

  useEffect(() => {
    dispatch(adminActions.getTopUsersMostFollower());
    dispatch(adminActions.getTopUserMostPost());

    return () => {
      dispatch(adminActions.resetStatsData());
    };
  }, []);
  return (
    <>
      <Box marginY={2} padding={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <AppHeading heading='Top 10 users with the most followers' />
            <Box marginY={2}>
              <AppBarChart
                data={userMostFollower}
                labelField='fullName'
                valueField='totalFollower'
                chartTitle='Top 10 users with the most followers'
                hoverLabel='Follower'
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <AppHeading heading='Top 10 users with the most posts' />
            <Box marginY={2}>
              <AppBarChart
                data={userMostPost}
                labelField='fullName'
                valueField='totalPost'
                chartTitle='Top 10 users with the most posts'
                hoverLabel='Total post'
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Achievement;
