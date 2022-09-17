import { PersonAdd } from '@mui/icons-material';
import { Box, Button, Divider, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import GoogleLogin from 'react-google-login';
import { NavLink, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppFormInput } from '../../../solutions/components/app-form-input';
import { AppIcon } from '../../../solutions/components/app-icon';
import { authActions, authSelectors } from '../store';
import styles from './styles.module.scss';
import { useEffect } from 'react';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {},
    validationSchema: yup.object({
      username: yup.string().required('Required'),
      password: yup.string().required('Required'),
    }),
  });

  const handleOnSuccess = (obj: any) => {
    console.log('Handle On Success', obj);
  };

  const handleSignIn = async () => {
    const response = await dispatch(authActions.signInActionAsync(form.values));
    if (response.meta.requestStatus === 'fulfilled') {
      navigate(-2);
    }
  };

  return (
    <>
      <Box className={styles.wrapper} boxShadow={1}>
        <Box className={styles.form}>
          <Typography variant='h3' textAlign='center' color='#9391fd' marginBottom={4} fontWeight='500'>
            Login
          </Typography>
          <Box className={styles['form-group']}>
            <AppFormInput label='Username' form={form} formControlName='username' />
          </Box>
          <Box className={styles['form-group']}>
            <AppFormInput type='password' label='Password' form={form} formControlName='password' />
          </Box>
          <Stack direction='row' spacing={2} justifyContent='flex-end' alignItems='center' width='100%' paddingY={1}>
            <AppIcon component={PersonAdd} />
            <NavLink to='/sign-up'>Create new account</NavLink>
          </Stack>
          <Box className={styles['form-group']}>
            <Button
              fullWidth
              variant='contained'
              color='secondary'
              className={styles.btn}
              onClick={handleSignIn}
              disabled={!form.isValid}
            >
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
