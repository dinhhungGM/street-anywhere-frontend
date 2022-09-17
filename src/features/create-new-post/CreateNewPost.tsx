import { Close, Map, Upload } from '@mui/icons-material';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppFormInput } from '../../solutions/components/app-form-input';
import { AppIcon } from '../../solutions/components/app-icon';
import { AppMapPopup } from '../../solutions/components/app-map-pop-up';
import { authSelectors } from '../auth/store';
import { postActions } from '../posts/store';
import styles from './styles.module.scss';
import * as utils from './utils';

const CreateNewPost = () => {
  const form = useFormik({
    initialValues: {
      title: '',
      shortTitle: '',
      description: '',
      location: '',
      longitude: '',
      latitude: '',
      file: '',
    },
    onSubmit: (values) => {
      const payload = utils.constructPostPayload(values);
      dispatch(postActions.createPostActionAsync(payload));
    },
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);

  const handleFileChanges = (event: any): void => {
    const file = event.target.files[0];
    form.setFieldValue('file', file);
    setSelectedFile(file);
  };

  const handleCancelFile = (): void => {
    form.setFieldValue('file', '');
    setSelectedFile(null);
  };

  const handleOnSelect = (locationInfo: any): void => {
    form.setFieldValue('latitude', locationInfo.latitude);
    form.setFieldValue('longitude', locationInfo.longitude);
    form.setFieldValue('location', locationInfo.location);
  };

  const handleCreateNewPost = async () => {
    const payload = utils.constructPostPayload(form.values);
    const response = await dispatch(postActions.createPostActionAsync(payload));
    if (response.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  useEffect(() => {
    if (currentUser) {
    } else {
      navigate('/sign-in');
    }
  }, []);

  return (
    <>
      <Container>
        <Box className={styles['form-control']}>
          <AppFormInput form={form} formControlName='title' label='Title' />
        </Box>
        <Box className={styles['form-control']}>
          <AppFormInput form={form} formControlName='shortTitle' label='Short title' />
        </Box>
        <Box className={styles['form-control']}>
          <AppFormInput form={form} formControlName='location' label='Location' />
        </Box>
        <Box className={styles['form-control']}>
          <AppFormInput form={form} formControlName='longitude' label='Longitude' disabled />
        </Box>
        <Box className={styles['form-control']}>
          <AppFormInput form={form} formControlName='latitude' label='Latitude' disabled />
        </Box>
        <Button
          variant='contained'
          startIcon={<AppIcon component={Map} color='#fff' />}
          onClick={() => setIsOpenMap(true)}
        >
          Select location
        </Button>
        {!selectedFile ? (
          <Box className={styles['form-control']}>
            <Button variant='contained' component='label' startIcon={<AppIcon component={Upload} color='#fff' />}>
              Upload
              <input hidden accept='image/*' multiple type='file' onChange={handleFileChanges} />
            </Button>
          </Box>
        ) : (
          <>
            <Stack spacing={2} direction='row' alignItems='center'>
              <Typography>{selectedFile.name}</Typography>
              <Button
                startIcon={<AppIcon component={Close} color='#e60023' />}
                color='error'
                onClick={handleCancelFile}
              >
                Cancel
              </Button>
            </Stack>
          </>
        )}
        <Box>
          <Button variant='contained' onClick={handleCreateNewPost}>
            Create
          </Button>
        </Box>
        <AppMapPopup isOpen={isOpenMap} onClose={() => setIsOpenMap(false)} onSelect={handleOnSelect} />
      </Container>
    </>
  );
};

export default CreateNewPost;
