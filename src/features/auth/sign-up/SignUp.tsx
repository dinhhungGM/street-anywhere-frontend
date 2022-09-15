import { Box, Button, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { AppFormInput } from '../../../solutions/components/app-form-input';
import styles from './styles.module.scss';

const SignUp = () => {
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    },
    onSubmit: (values) => {},
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
  return (
    <>
      <Box className={styles.wrapper} boxShadow={1}>
        <Box className={styles.form}>
          <Typography variant='h3' textAlign='center' color='#9391fd' marginBottom={4} fontWeight='500'>
            Sign Up
          </Typography>
          <Box className={styles['form-group']}>
            <AppFormInput label='Username' form={form} formControlName='username' />
          </Box>
          <Box className={styles['form-group']}>91
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
            <Button fullWidth variant='contained' color='secondary' className={styles.btn} disabled={!form.isValid}>
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
