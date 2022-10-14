import React from 'react';
import { DashboardSideBar } from './components/dashboard-side-bar';
import { useAppSelector } from '../../app/hooks';
import { authSelectors } from '../auth/store';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import styles from './styles.module.scss';

const AdminDashboard = () => {
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser && !currentUser.isAdmin) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <Box className={styles.dashboard}>
        <DashboardSideBar currentUser={currentUser} />
        <Box className={styles['main-content']}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default AdminDashboard;
