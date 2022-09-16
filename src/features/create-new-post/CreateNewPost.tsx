import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { AppFormInput } from '../../solutions/components/app-form-input';
import styles from './styles.module.scss';
import { useState } from 'react';
import { AppIcon } from '../../solutions/components/app-icon';
import { Close, Map } from '@mui/icons-material';
import { AppMapPopup } from '../../solutions/components/app-map-pop-up';

type PostLocation = {
  longitude: number;
  latitude: number;
  location: string;
};

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
      console.log(values);
    },
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [postLocation, setPostLocation] = useState<Location | null>(null);
  const [isOpenMap, setIsOpenMap] = useState(false);

  const handleFileChanges = (event: any): void => {
    const file = event.target.files[0];
    form.setFieldValue('file', file);
    setSelectedFile(file);
  };

  const handleCancelFile = (): void => {
    form.setFieldValue('file', '');
    setSelectedFile(null);
  };

  return (
    <>
      <Container>
        <Box className={styles['form-control']}>
          <AppFormInput form={form} formControlName='title' label='Title' />
        </Box>
        <Box className={styles['form-control']}>
          <AppFormInput form={form} formControlName='shortTitle' label='Short title' />
        </Box>
        <Box className={styles['form-control']}></Box>
        {postLocation ? (
          <>
            <Box className={styles['form-control']}>
              <AppFormInput form={form} formControlName='location' label='Location' />
            </Box>
            <Box className={styles['form-control']}>
              <AppFormInput form={form} formControlName='longitude' label='Longitude' />
            </Box>
            <Box className={styles['form-control']}>
              <AppFormInput form={form} formControlName='latitude' label='Latitude' />
            </Box>
          </>
        ) : (
          <>
            <Button
              variant='contained'
              startIcon={<AppIcon component={Map} color='#fff' />}
              onClick={() => setIsOpenMap(true)}
            >
              Select location
            </Button>
          </>
        )}
        {!selectedFile ? (
          <Box className={styles['form-control']}>
            <Button variant='contained' component='label'>
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
        <AppMapPopup isOpen={isOpenMap} onClose={() => setIsOpenMap(false)} onSelect={() => setIsOpenMap(false)} />
      </Container>
    </>
  );
};

export default CreateNewPost;
