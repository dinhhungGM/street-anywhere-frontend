import { Box, Button, Divider, Grid, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GoogleLogin from 'react-google-login';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';

const SignIn = () => {
  const handleOnSuccess = (obj: any) => {
    console.log('Handle On Success', obj);
  };

  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item sm={12} md={6}>
            <Stack alignItems='center' justifyContent='center' className={styles['form-container']}>
              <Typography variant='h2'>Sign in to application</Typography>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' width='300px'>
                  If you don't have an account register. You can <NavLink to='/sign-up'>register here!</NavLink>
                </Typography>
                <img src='/sign-in.png' alt='Sign in' />
              </Stack>
            </Stack>
          </Grid>
          <Grid item sm={12} md={6}>
            <Box className={styles['form-container']}>
              <Typography variant='h3' marginBottom={8}>
                Sign in
              </Typography>
              <TextField label='Username' className={styles['form-control']} />
              <TextField label='Password' className={styles['form-control']} />
              <Button variant='contained' className={styles['form-submit']}>
                Sign in
              </Button>
              <Divider className={styles.divider}>Or continue with</Divider>
              <GoogleLogin
                clientId='658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'
                onSuccess={handleOnSuccess}
                onFailure={handleOnSuccess}
                cookiePolicy={'single_host_origin'}
                className={styles['btn-google']}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SignIn;
