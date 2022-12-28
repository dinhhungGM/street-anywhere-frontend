import { Box, Divider, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppBarChart } from '../../../../solutions/components/app-bar-chart';
import { AppHeading } from '../../../../solutions/components/app-heading';
import { adminActions, adminSelectors } from '../../store';

const Achievement = () => {
  const dispatch = useAppDispatch();
  const userMostPost = useAppSelector(adminSelectors.selectTopUserMostPost);
  const userMostFollower = useAppSelector(adminSelectors.selectTopUserMostFollower);
  const userMostBookmarks = useAppSelector(adminSelectors.selectTopUserMostBookmarks);
  const userMostInteractions = useAppSelector(adminSelectors.selectTopUserMostInteractions);

  useEffect(() => {
    dispatch(adminActions.getTopUsersMostFollower());
    dispatch(adminActions.getTopUserMostPost());
    dispatch(adminActions.getTopUsersMostInteractions());
    dispatch(adminActions.getTopUsersMostBookmarks());

    return () => {
      dispatch(adminActions.resetStatsData());
    };
  }, []);
  return (
    <>
      <Box padding={2}>
        <AppHeading heading='Achievements' isDashboardHeading />
        <br />
        <Divider />
        <Box marginY={2} padding={1}>
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
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
              <AppHeading heading='Top 10 most interactive users' />
              <Box marginY={2}>
                <AppBarChart
                  data={userMostInteractions}
                  labelField='fullName'
                  valueField='totalInteraction'
                  chartTitle='Number of comments and reactions'
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <AppHeading
                heading='Top 10 users with the most number of bookmarked posts'
                variant='h5'
              />
              <Box marginY={2}>
                <AppBarChart
                  data={userMostBookmarks}
                  labelField='fullName'
                  valueField='totalBookmark'
                  chartTitle='Top 10 users with the most number of bookmarked posts'
                  hoverLabel='Number of bookmarked'
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Achievement;
