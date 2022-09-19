import { Close, Map, Upload } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Chip,
  Container,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import AppIcon from '../../../solutions/components/app-icon/AppIcon';
import AppMapPopup from '../../../solutions/components/app-map-pop-up/AppMapPopup';
import { authSelectors } from '../../auth/store';
import { postActions, postSelectors } from '../store';
import { AppFormInput } from './../../../solutions/components/app-form-input';
import styles from './styles.module.scss';
import * as utils from './utils';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 134,
      width: 250,
    },
  },
};

const CreateNewPost = () => {
  //#region Initialize hook
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const tags = useAppSelector(postSelectors.selectTags);
  const categories = useAppSelector(postSelectors.selectCategories);
  //#endregion

  //#region Initial state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpenMap, setIsOpenMap] = useState(false);
  //#endregion

  //#region Initialize Form
  const form = useFormik({
    initialValues: {
      title: '',
      shortTitle: '',
      description: '',
      location: '',
      longitude: '',
      latitude: '',
      file: '',
      tags: [],
      categories: [],
    },
    onSubmit: (values) => {},
  });

  const handleFileChanges = (event: any): void => {
    const file = event.target.files[0];
    form.setFieldValue('file', file);
    setSelectedFile(file);
  };

  const handleCancelFile = (): void => {
    form.setFieldValue('file', '');
    setSelectedFile(null);
  };

  // const handleOnSelect = (locationInfo: any): void => {
  //   form.setFieldValue('latitude', locationInfo.latitude);
  //   form.setFieldValue('longitude', locationInfo.longitude);
  //   form.setFieldValue('location', locationInfo.location);
  // };

  const handleCreateNewPost = async () => {
    const payload = utils.constructPostPayload(form.values, currentUser.id);
    const response = await dispatch(postActions.createPostActionAsync(payload));
    if (response.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  const handleTagsChange = (event: any): void => {
    const { value } = event.target;
    form.setFieldValue('tags', value);
  };

  const handleCategoriesChange = (event: any): void => {
    const { value } = event.target;
    form.setFieldValue('categories', value);
  };
  //#endregion

  //#region Handle Popup
  const handleOnSelectPoint = (location): void => {
    if (location) {
      ['latitude', 'longitude', 'location'].forEach((fieldName) => {
        form.setFieldValue(fieldName, location[fieldName] || 'Viet Nam');
      });
    }
    handleCloseAppMapPopup();
  };

  const handleCloseAppMapPopup = (): void => {
    setIsOpenMap(false);
  };
  //#endregion

  useEffect(() => {
    if (currentUser) {
      dispatch(postActions.getCategoriesAsync(null));
      dispatch(postActions.getTagsAsync(null));
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
          <AppFormInput form={form} formControlName='description' label='Description' />
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
        <FormControl className={styles['form-control']}>
          <InputLabel id='tags-label'>Tags</InputLabel>
          <Select
            id='tags'
            multiple
            fullWidth
            labelId='tags-label'
            value={form.values.tags}
            input={<OutlinedInput label='Tags' />}
            MenuProps={MenuProps}
            renderValue={(selectedValues: string[]) => {
              if (selectedValues.length) {
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {utils.mapJson2Obj(selectedValues).map((value) => (
                      <Chip key={value.id} label={value.tagName} />
                    ))}
                  </Box>
                );
              }
            }}
            onChange={handleTagsChange}
          >
            {Array.isArray(tags) &&
              tags.map((tag) => (
                <MenuItem key={tag.id} value={JSON.stringify(tag)}>
                  {tag.tagName}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl className={styles['form-control']}>
          <InputLabel id='categories-label'>Categories</InputLabel>
          <Select
            multiple
            fullWidth
            labelId='categories-label'
            value={form.values.categories}
            input={<OutlinedInput label='Categories' />}
            MenuProps={MenuProps}
            renderValue={(selectedValues: string[]) => {
              if (selectedValues.length) {
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {utils.mapJson2Obj(selectedValues).map((value) => (
                      <Chip key={value.id} label={value.categoryName} />
                    ))}
                  </Box>
                );
              }
            }}
            onChange={handleCategoriesChange}
          >
            {Array.isArray(categories) &&
              categories.map((category: any) => (
                <MenuItem key={category.id} value={JSON.stringify(category)}>
                  <Checkbox />
                  <ListItemText primary={category.categoryName} />
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <Box>
          <Button variant='contained' onClick={handleCreateNewPost}>
            Create
          </Button>
        </Box>
        <AppMapPopup isOpen={isOpenMap} onClose={handleCloseAppMapPopup} onSelect={handleOnSelectPoint} />
      </Container>
    </>
  );
};

export default CreateNewPost;
