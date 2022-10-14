import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { memo, useEffect, useMemo } from 'react';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { AppModal } from '../../../../../../solutions/components/app-modal';
import { wrapperActions } from '../../../../../wrapper/store';
import { adminActions, adminSelectors } from '../../../../store';
import styles from './styles.module.scss';

interface IUserModalProps {
  adminUserId: number;
  isOpen: boolean;
  onClose: () => void;
}
const UserModal = ({ adminUserId, isOpen, onClose }: IUserModalProps) => {
  const allRoles = useAppSelector(adminSelectors.selectAllRoles);
  const dispatch = useAppDispatch();
  const form = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      roleId: '',
    },
    onSubmit: (values, { resetForm }) => {
      const { passwordConfirm, ...userInfo } = values;
      dispatch(
        adminActions.createNewUser({
          adminUserId,
          payload: userInfo,
        }),
      ).then((status) => {
        if (status.meta.requestStatus === 'fulfilled') {
          dispatch(
            wrapperActions.showNotification({
              typeOfNotification: 'success',
              message: 'Create user successfully',
            }),
          );
          closeModal();
        }
      });
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required('Please provide username')
        .trim()
        .min(2, 'The username should be more than 2 characters')
        .max(50, 'The username can not be more than 50 characters'),
      password: yup
        .string()
        .required('Please provide password')
        .trim()
        .min(6, 'The password should be more than 2 characters')
        .max(50, 'The password can not be more than 50 characters'),
      passwordConfirm: yup
        .string()
        .required('Please confirm password')
        .oneOf([yup.ref('password'), null], 'Password confirm does not match'),
      firstName: yup
        .string()
        .required('Please provide first name')
        .trim()
        .max(50, 'The first name can not be more than 50 characters'),
      lastName: yup
        .string()
        .required('Please provide last name')
        .trim()
        .max(50, 'The last name can not be more than 50 characters'),
      roleId: yup.string().required('Please select user role'),
    }),
  });

  const checkControl = (controlName: string) => {
    if (form.touched[controlName] && form.errors[controlName]) {
      return {
        helperText: form.errors[controlName],
      };
    }
    return null;
  };

  const closeModal = (): void => {
    form.resetForm();
    onClose();
  };

  useEffect(() => {
    dispatch(adminActions.getAllRolesForManagement(adminUserId));
  }, []);

  const roleOptions = useMemo(() => {
    if (allRoles) {
      return allRoles.map((role) => ({ id: role.id, roleName: role.roleName }));
    }
    return [];
  }, [allRoles]);

  return (
    <>
      <AppModal
        isOpen={isOpen}
        onClose={closeModal}
        onCancel={closeModal}
        title='Create user'
        okText='Create'
        onOk={form.handleSubmit}
      >
        <form>
          <FormControl fullWidth className={styles.form__control}>
            <TextField
              id='username'
              label='Username'
              placeholder='Username'
              {...form.getFieldProps('username')}
              error={!!checkControl('username')}
              {...checkControl('password')}
            />
          </FormControl>
          <FormControl fullWidth className={styles.form__control}>
            <TextField
              id='password'
              type='password'
              label='Password'
              placeholder='Password'
              {...form.getFieldProps('password')}
              error={!!checkControl('password')}
              {...checkControl('password')}
            />
          </FormControl>
          <FormControl fullWidth className={styles.form__control}>
            <TextField
              type='password'
              id='passwordConfirm'
              label='Confirm password'
              placeholder='Confirm password'
              {...form.getFieldProps('passwordConfirm')}
              error={!!checkControl('passwordConfirm')}
              {...checkControl('passwordConfirm')}
            />
          </FormControl>
          <FormControl fullWidth className={styles.form__control}>
            <TextField
              type='firstName'
              id='firstName'
              label='First name'
              placeholder='First name'
              {...form.getFieldProps('firstName')}
              error={!!checkControl('firstName')}
              {...checkControl('firstName')}
            />
          </FormControl>
          <FormControl fullWidth className={styles.form__control}>
            <TextField
              type='lastName'
              id='lastName'
              label='Last name'
              placeholder='Last name'
              {...form.getFieldProps('lastName')}
              error={!!checkControl('lastName')}
              {...checkControl('lastName')}
            />
          </FormControl>
          <FormControl fullWidth className={styles.form__control}>
            <InputLabel htmlFor='role'>Role</InputLabel>
            <Select
              label='Role'
              {...form.getFieldProps('roleId')}
              error={!!checkControl('lastName')}
              {...checkControl('lastName')}
            >
              {roleOptions.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.roleName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </form>
      </AppModal>
    </>
  );
};

export default memo(UserModal);
