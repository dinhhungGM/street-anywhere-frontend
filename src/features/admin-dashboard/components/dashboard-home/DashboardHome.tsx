import { Box, Typography } from '@mui/material';
import React from 'react';
import styles from './styles.module.scss';

const DashboardHome = () => {
  return (
    <>
      <Box className={styles.home}>
        <Typography variant='h4' fontWeight={700} className={styles.home__greeting}>
          Hi, Welcome back!
        </Typography>
      </Box>
    </>
  );
};

export default DashboardHome;
