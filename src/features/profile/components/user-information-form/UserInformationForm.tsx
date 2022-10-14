import { Box, Button, Divider, Typography } from '@mui/material';
import cx from 'classnames';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../app/hooks';
import { AppFormInput } from '../../../../solutions/components/app-form-input';
import { IUser } from '../../../../solutions/models/authModels';
import AlertUtil from '../../../../solutions/utils/alertUtil';
import styles from './styles.module.scss';
import * as utils from './utils';
import SweetAlert from 'sweetalert2';
import { wrapperActions } from '../../../wrapper/store';
import { profileActions } from '../../store';

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
    onSubmit: (values) => {
      const formData = new FormData();
      const originalInfo = {
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        bio: currentUser?.bio,
        password: '',
        passwordConfirm: '',
      };
      const isDiff = !_.isEqual(originalInfo, values);
      if (isDiff) {
        const keyChanges = utils.findKeyChange(originalInfo, values);
        for (const key of keyChanges) {
          const value = values[key];
          switch (key) {
            case 'password': {
              if (value.length < 6) {
                dispatch(
                  wrapperActions.showNotification({
                    typeOfNotification: 'warning',
                    message: `Password should be more than 5 characters`,
                  }),
                );
                return;
              }
              break;
            }
            default: {
              if (!value.trim()) {
                dispatch(
                  wrapperActions.showNotification({
                    typeOfNotification: 'warning',
                    message: `The ${key} does not empty`,
                  }),
                );
                return;
              }
              break;
            }
          }
          formData.append(key, value.trim());
        }
        if (uploadFile) {
          formData.append('avatar', uploadFile);
        }
        dispatch(
          profileActions.updateUser({
            userId: currentUser?.id,
            formData,
          }),
        );
      } else {
        dispatch(
          wrapperActions.showNotification({
            typeOfNotification: 'warning',
            message: `Please enter information to continue`,
          }),
        );
      }
    },
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
            <AppFormInput
              label='First name'
              type='text'
              form={form}
              formControlName='firstName'
              className={styles.form__control}
            />
          </Box>
          <Box className={styles.form__group}>
            <AppFormInput
              label='Last name'
              type='text'
              form={form}
              formControlName='lastName'
              className={styles.form__control}
            />
          </Box>
          <Box className={styles.form__group}>
            <AppFormInput
              label='Bio link'
              type='text'
              form={form}
              formControlName='bio'
              className={styles.form__control}
            />
          </Box>
          <Box className={styles.form__group}>
            <AppFormInput
              label='Password'
              type='password'
              form={form}
              formControlName='password'
              className={styles.form__control}
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
