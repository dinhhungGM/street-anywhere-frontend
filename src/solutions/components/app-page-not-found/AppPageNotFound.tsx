import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../app-icon';
import styles from './styles.module.scss';

const AppPageNotFound = () => {
  const navigate = useNavigate();

  const handleNavigateToHome = (): void => {
    navigate(-1);
  };

  return (
    <>
      <Box className={styles.container}>
        <Typography variant='h3'>Oops..! 404 Resource not found</Typography>
        <img src='/pagenotfound.jpg' alt='page-not-found' height='500' width='500' />
        <Button
          startIcon={<AppIcon icon={ArrowBack} color='#fff' />}
          onClick={handleNavigateToHome}
          variant='contained'>
          Back to previous page
        </Button>
      </Box>
    </>
  );
};

export default AppPageNotFound;
