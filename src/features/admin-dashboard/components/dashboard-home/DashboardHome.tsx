import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppHeading } from '../../../../solutions/components/app-heading';
import { AppInfoWidget } from '../../../../solutions/components/app-info-widget';
import AppStatsByYear from '../../../../solutions/components/app-stats-by-year/AppStatsByYear';
import { AppTable } from '../../../../solutions/components/app-table';
import { adminActions, adminSelectors } from '../../store';
import {
  topFollowersTableHeaderConfigs,
  topFollowersTableRowConfigs,
  topPostsTableHeaderConfigs,
  topPostsTableRowConfigs,
  widgetConfigs,
} from './configs';
import styles from './styles.module.scss';
import randomColor from 'randomcolor';

const genColor = () => randomColor({ luminosity: 'dark', format: 'hex' });

const DashboardHome = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const usersByYears = useAppSelector(adminSelectors.selectUsersByYears);
  const postsByYears = useAppSelector(adminSelectors.selectPostsByYears);
  const userMostPost = useAppSelector(adminSelectors.selectTopUserMostPost);
  const userMostFollower = useAppSelector(adminSelectors.selectTopUserMostFollower);
  const systemStats = useAppSelector(adminSelectors.selectSysStats);

  const navigateToProfile = useCallback((userId: number) => {
    navigate(`/profile/${ userId }`);
  }, []);

  useEffect(() => {
    dispatch(adminActions.getStatsOfUserByYear());
    dispatch(adminActions.getStatsOfPostsByYear());
    dispatch(adminActions.getTopUsersMostFollower());
    dispatch(adminActions.getTopUserMostPost());
    dispatch(adminActions.getSystemStats());

    return () => {
      dispatch(adminActions.resetStatsData());
    };
  }, []);

  return (
    <>
      <Box className={styles.home}>
        <Typography variant='h4' fontWeight={700} className={styles.home__greeting}>
          Hi, Welcome back!
        </Typography>
        <Divider />
        <Box marginY={2}>
          <AppHeading heading='System Overall' />
          <Box
            marginY={3}
            sx={{
              sm: {
                flexDirection: 'column',
              },
              md: {
                flexDirection: 'row',
              },
            }}
            display='flex'
            gap={2}
            alignItems='center'
            justifyContent='center'>
            {widgetConfigs.map((config) => (
              <AppInfoWidget
                key={config.id}
                icon={config.icon}
                title={config.title}
                iconColor={genColor()}
                value={systemStats ? systemStats[config.mappingValue] : 0}
              />
            ))}
          </Box>
        </Box>
        <Box marginY={1}>
          <Grid container spacing={4} alignItems='center' justifyContent='center'>
            <Grid item md={6} xs={12} sm={12}>
              <Box width='100%' height='100%'>
                <Box marginY={1}>
                  <AppHeading heading='Number of users by month' />
                </Box>
                {usersByYears && (
                  <AppStatsByYear
                    dataByYears={usersByYears}
                    chartTitle='Number of users by month'
                  />
                )}
              </Box>
            </Grid>
            <Grid item md={6} xs={12} sm={12}>
              <Box width='100%' height='100%'>
                <Box marginY={1}>
                  <AppHeading heading='Number of posts by month' />
                </Box>
                {postsByYears && (
                  <AppStatsByYear
                    dataByYears={postsByYears}
                    chartTitle='Number of posts by month'
                  />
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box marginY={2}>
          <AppHeading heading='Top 10 people with the most number of followers' />
          <Box marginY={2}>
            <AppTable
              mappingClickField='id'
              data={userMostFollower}
              isFilterByOption={false}
              onRowClick={navigateToProfile}
              rowConfigs={topFollowersTableRowConfigs}
              headerConfigs={topFollowersTableHeaderConfigs}
            />
          </Box>
        </Box>
        <Box marginY={2}>
          <AppHeading heading='Top 10 people with the most posts' />
          <Box marginY={2}>
            <AppTable
              data={userMostPost}
              mappingClickField='id'
              isFilterByOption={false}
              onRowClick={navigateToProfile}
              rowConfigs={topPostsTableRowConfigs}
              headerConfigs={topPostsTableHeaderConfigs}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DashboardHome;
