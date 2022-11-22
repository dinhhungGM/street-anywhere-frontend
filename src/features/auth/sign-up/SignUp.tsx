import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppFormInput } from '../../../solutions/components/app-form-input';
import { authSelectors } from '../store';
import { signUpActionAsync } from '../store/authSlice';
import styles from './styles.module.scss';

const SignUp = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const navigate = useNavigate();
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    onSubmit: async (values) => {
      delete values.confirmPassword;
      const response = await dispatch(signUpActionAsync(values));
      if (response.meta.requestStatus === 'fulfilled') {
        navigate('/');
      }
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required('Required')
        .trim()
        .max(50, 'Username is too long - should less than 50 characters'),
      password: yup.string().required('Required').trim().min(6, 'Password is too short - should be 6 chars minimum.'),
      confirmPassword: yup
        .string()
        .required('Required')
        .oneOf([yup.ref('password'), null], 'Password confirm does not match'),
      firstName: yup
        .string()
        .required('Required')
        .trim()
        .max(50, 'Your first name is too long - should less than 50 characters'),
      lastName: yup
        .string()
        .required('Required')
        .max(50, 'Your first name is too long - should less than 50 characters'),
    }),
  });

  useEffect(() => {
    if (currentUser) {
      navigate(-1);
    }
  }, []);

  return (
    <>
      <Box className={styles.wrapper} boxShadow={1}>
        <form onSubmit={form.handleSubmit}>
          <Box className={styles.form}>
            <Typography variant='h3' textAlign='center' color='#9391fd' marginBottom={4} fontWeight='500'>
              Sign Up
            </Typography>
            <Box className={styles['form-group']}>
              <AppFormInput label='Username' form={form} formControlName='username' />
            </Box>
            <Box className={styles['form-group']}>
              <AppFormInput type='password' label='Password' form={form} formControlName='password' />
            </Box>
            <Box className={styles['form-group']}>
              <AppFormInput type='password' label='Confirm password' form={form} formControlName='confirmPassword' />
            </Box>
            <Box className={styles['form-group']}>
              <AppFormInput label='First name' form={form} formControlName='firstName' />
            </Box>
            <Box className={styles['form-group']}>
              <AppFormInput label='Last name' form={form} formControlName='lastName' />
            </Box>
            <Box className={styles['form-group']}>
              <Button
                fullWidth
                variant='contained'
                color='secondary'
                className={styles.btn}
                disabled={!form.isValid}
                type='submit'>
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default SignUp;
