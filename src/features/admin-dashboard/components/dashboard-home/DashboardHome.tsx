import { Box, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { adminActions, adminSelectors } from '../../store';
import AppStatsByYear from '../../../../solutions/components/app-stats-by-year/AppStatsByYear';

const DashboardHome = () => {
  const dispatch = useAppDispatch();
  const usersByYears = useAppSelector(adminSelectors.selectUsersByYears);
  const postsByYears = useAppSelector(adminSelectors.selectPostsByYears);

  useEffect(() => {
    dispatch(adminActions.getStatsOfUserByYear());
    dispatch(adminActions.getStatsOfPostsByYear());
  }, []);
  return (
    <>
      <Box className={styles.home}>
        <Typography variant='h4' fontWeight={700} className={styles.home__greeting}>
          Hi, Welcome back!
        </Typography>
        <Grid container spacing={4} alignItems='center' justifyContent='center'>
          <Grid item md={6} xs={12} sm={12}>
            <Box width='100%' height='100%'>
              {usersByYears && <AppStatsByYear dataByYears={usersByYears} chartTitle='Number of new users by month' />}
            </Box>
          </Grid>
          <Grid item md={6} xs={12} sm={12}>
            <Box width='100%' height='100%'>
              {postsByYears && <AppStatsByYear dataByYears={postsByYears} chartTitle='Number of posts by month' />}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardHome;
