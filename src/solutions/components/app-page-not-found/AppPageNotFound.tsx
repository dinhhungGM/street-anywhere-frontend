import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../app-icon';
import styles from './styles.module.scss';

const AppPageNotFound = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = (): void => {
    navigate('/');
  };

  return (
    <>
      <Box className={styles.container}>
        <Typography variant='h3'>Oops..! 404 Resource not found</Typography>
        <Typography variant='h6' marginTop={2}>
          Looks like you came to wrong page on our server
        </Typography>
        <img src='/pagenotfound.jpg' alt='page-not-found' height='500' width='500' />
        <Button startIcon={<AppIcon icon={ArrowBack} color='#0288d1' />} onClick={handleNavigateToHome}>
          Back to home
        </Button>
      </Box>
    </>
  );
};

export default AppPageNotFound;
