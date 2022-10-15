import { Delete, Edit, MoreVert } from '@mui/icons-material';
import {
  FormControl,
  IconButton,
  InputLabel,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { useFormik } from 'formik';
import { memo, useMemo, useRef, useState } from 'react';
import SweetAlert from 'sweetalert2';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { AppIcon } from '../../../../../../solutions/components/app-icon';
import { AppModal } from '../../../../../../solutions/components/app-modal';
import { adminActions, adminSelectors } from '../../../../store';
import styles from './styles.module.scss';

interface IUserMoreMenuProps {
  adminUserId: number;
  user: any;
}
const UserMoreMenu = ({ adminUserId, user }: IUserMoreMenuProps) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useAppDispatch();
  const form = useFormik({
    initialValues: {
      password: '',
      passwordConfirm: '',
      roleId: user.roleId,
    },
    onSubmit: (values) => {
      alert('Coming soon');
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .optional()
        .trim()
        .min(6, 'The password should be more than 2 characters')
        .max(50, 'The password can not be more than 50 characters'),
      passwordConfirm: yup
        .string()
        .optional()
        .trim()
        .oneOf([yup.ref('password'), null], 'Password confirm does not match'),
    }),
  });
  const allRoles = useAppSelector(adminSelectors.selectAllRoles);

  const handleDeleteUser = (): void => {
    setIsOpen(false);
    SweetAlert.fire({
      title: 'Confirm',
      icon: 'question',
      text: `Are you sure to delete ${user.fullName} account?`,
      showCancelButton: true,
    }).then((status) => {
      if (status.isConfirmed) {
        dispatch(
          adminActions.deleteUser({
            adminUserId,
            userId: user.id,
          }),
        );
      }
    });
  };

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
    setIsOpenModal(false);
  };

  const roleOptions = useMemo(() => {
    if (allRoles) {
      return allRoles.map((role) => ({ id: role.id, roleName: role.roleName }));
    }
    return [];
  }, [allRoles]);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <AppIcon icon={MoreVert} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleDeleteUser}>
          <ListItemIcon>
            <AppIcon icon={Delete} />
          </ListItemIcon>
          <ListItemText primary='Delete' primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={() => setIsOpenModal(true)}>
          <ListItemIcon>
            <AppIcon icon={Edit} />
          </ListItemIcon>
          <ListItemText primary='Edit' primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
      <AppModal
        isOpen={isOpenModal}
        onCancel={closeModal}
        onClose={closeModal}
        onOk={form.handleSubmit}
        title='Update user'
        okText='Update'
      >
        <form>
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

export default memo(UserMoreMenu);
