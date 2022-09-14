import { PersonAdd } from '@mui/icons-material';
import { Box, Button, Divider, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import GoogleLogin from 'react-google-login';
import { NavLink } from 'react-router-dom';
import * as yup from 'yup';
import { useAppDispatch } from '../../app/hooks';
import { AppIcon } from '../../solutions/components/app-icon';
import { authActions } from './store';
import styles from './styles.module.scss';

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
      <Box className={styles.wrapper} boxShadow={1}>
        <Box className={styles.form}>
          <Typography variant='h3' textAlign='center' color='#9391fd' marginBottom={4} fontWeight='500'>
            Login
          </Typography>
          <Box className={styles['form-group']}>
            <TextField
              type='text'
              fullWidth
              label='Username'
              {...form.getFieldProps('username')}
              {...checkControl('username')}
            />
          </Box>
          <Box className={styles['form-group']}>
            <TextField
              type='password'
              fullWidth
              label='Password'
              {...form.getFieldProps('password')}
              {...checkControl('password')}
            />
          </Box>
          <Stack direction='row' spacing={2} justifyContent='flex-end' alignItems='center' width='100%' paddingY={1}>
            <AppIcon component={PersonAdd} />
            <NavLink to='/sign-up'>Create new account</NavLink>
          </Stack>
          <Box className={styles['form-group']}>
            <Button fullWidth variant='contained' className={styles.btn} onClick={handleSignIn}>
              Login
            </Button>
          </Box>
          <Divider>Or continue with</Divider>
          <Stack paddingY={4} alignItems='center' justifyContent='center'>
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_AUTHENTICATION_CLIENT_ID as string}
              onSuccess={handleOnSuccess}
              onFailure={handleOnSuccess}
              cookiePolicy={'single_host_origin'}
              className={styles['btn-google']}
            />
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default SignIn;
