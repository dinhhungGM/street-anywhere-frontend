import { Box, Button, Divider, Grid, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import GoogleLogin from 'react-google-login';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useAppDispatch } from '../../app/hooks';
import { authActions } from './store';

const GOOGLE_AUTH_CLIENT_KEY = process.env.REACT_APP_GOOGLE_AUTHENTICATION_CLIENT_ID || undefined;

const SignIn = () => {
  const dispatch = useAppDispatch();
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      dispatch(authActions.signInActionAsync(values));
    },
    validationSchema: yup.object({
      username: yup.string().required('Required'),
      password: yup.string().required('Required'),
    }),
  });

  const handleOnSuccess = (obj: any) => {
    console.log('Handle On Success', obj);
  };

  const checkControl = (field: 'username' | 'password'): { error: boolean; helperText: string | undefined; } | null => {
    if (form.touched[field] && !!form.errors[field]) {
      return {
        error: true,
        helperText: form.errors[field],
      };
    }
    return null;
  };

  const handleSignIn = (): void => {
    form.handleSubmit();
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
              <TextField
                label='Username'
                className={styles['form-control']}
                type='text'
                {...form.getFieldProps('username')}
                {...checkControl('username')}
              />
              <TextField
                label='Password'
                className={styles['form-control']}
                type='password'
                {...form.getFieldProps('password')}
                {...checkControl('password')}
              />
              <Button variant='contained' className={styles['form-submit']} onClick={handleSignIn}>
                Sign in
              </Button>
              <Divider className={styles.divider}>Or continue with</Divider>
              <GoogleLogin
                clientId={GOOGLE_AUTH_CLIENT_KEY as string}
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
