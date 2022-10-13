import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import cx from 'classnames';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useAppDispatch } from '../../../../app/hooks';
import { IUser } from '../../../../solutions/models/authModels';
import AlertUtil from '../../../../solutions/utils/alertUtil';
import styles from './styles.module.scss';
import * as utils from './utils';

interface IUserInformationFormProps {
  currentUser: IUser;
}

const UserInformationForm = ({ currentUser }: IUserInformationFormProps) => {
  const [uploadFile, setUploadFile] = useState(null);
  const dispatch = useAppDispatch();

  const form = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      bio: '',
      password: '',
      passwordConfirm: '',
    },
    onSubmit: (values) => {},
    validationSchema: yup.object({
      firstName: yup.string().trim().required('Required'),
      lastName: yup.string().trim().required('Required'),
      bio: yup.string().trim(),
      password: yup.string().trim().required('Required'),
      passwordConfirm: yup.string().trim(),
    }),
  });
  //#region Initialize form
  useEffect(() => {
    form.setValues({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      bio: currentUser?.bio,
      password: '',
      passwordConfirm: '',
    });
  }, []);
  //#endregion

  //#region Handle upload file
  const handleFileChanges = (event: any): void => {
    const file = event.target.files[0];
    if (file && utils.isValidFileType(file.type)) {
      form.setFieldValue('file', file);
      setUploadFile(file);
    } else {
      AlertUtil.showError('Invalid file. Please choose an image!');
    }
  };
  //#endregion
  return (
    <>
      <Box className={styles.form}>
        <Typography variant='h3' marginY={2}>
          Profile
        </Typography>
        <Divider />
        <form onSubmit={form.handleSubmit}>
          <Box className={cx(styles.form__group, styles['form__group--avatar'])}>
            <img src={currentUser?.profilePhotoUrl} alt={currentUser?.fullName} />
            {!uploadFile ? (
              <Button variant='contained' component='label'>
                Upload
                <input hidden accept='image/*' multiple type='file' onChange={handleFileChanges} />
              </Button>
            ) : (
              <Box className={styles['form__group--upload-file']}>
                <Typography marginRight={3}>{uploadFile.name}</Typography>
                <Button variant='contained' onClick={() => setUploadFile(null)} color='error'>
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
          <Box className={styles.form__group}>
            <TextField
              className={styles.form__control}
              type='text'
              label='First name'
              variant='outlined'
              {...form.getFieldProps('firstName')}
            />
          </Box>
          <Box className={styles.form__group}>
            <TextField
              className={styles.form__control}
              type='text'
              label='Last name'
              variant='outlined'
              {...form.getFieldProps('lastName')}
            />
          </Box>
          <Box className={styles.form__group}>
            <TextField
              className={styles.form__control}
              type='text'
              label='Bio link'
              variant='outlined'
              {...form.getFieldProps('bio')}
            />
          </Box>
          <Box className={styles.form__group}>
            <TextField
              className={styles.form__control}
              type='password'
              label='Password'
              variant='outlined'
              {...form.getFieldProps('bio')}
            />
          </Box>
          <Box className={styles.form__group}>
            <TextField
              className={styles.form__control}
              type='password'
              label='Confirm password'
              variant='outlined'
              {...form.getFieldProps('bio')}
            />
          </Box>
          <Box className={styles.form__group}>
            <Button type='submit' variant='contained' disabled={!(form.isValid && form.dirty)}>
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default UserInformationForm;
