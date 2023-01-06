import { Box, Divider, Grid, Typography } from '@mui/material';
import randomColor from 'randomcolor';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppHeading } from '../../../../solutions/components/app-heading';
import { AppInfoWidget } from '../../../../solutions/components/app-info-widget';
import AppStatsByYear from '../../../../solutions/components/app-stats-by-year/AppStatsByYear';
import { adminActions, adminSelectors } from '../../store';
import { widgetConfigs } from './configs';
import styles from './styles.module.scss';

const genColor = () => randomColor({ luminosity: 'dark', format: 'hex' });

const DashboardHome = () => {
  const dispatch = useAppDispatch();
  const usersByYears = useAppSelector(adminSelectors.selectUsersByYears);
  const postsByYears = useAppSelector(adminSelectors.selectPostsByYears);
  const systemStats = useAppSelector(adminSelectors.selectSysStats);

  useEffect(() => {
    dispatch(adminActions.getStatsOfUserByYear());
    dispatch(adminActions.getStatsOfPostsByYear());
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
            className={styles['system-overall']}
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
      </Box>
    </>
  );
};

export default DashboardHome;
