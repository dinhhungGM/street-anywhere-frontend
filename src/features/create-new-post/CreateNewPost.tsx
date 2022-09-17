import { Close, Map, Upload } from '@mui/icons-material';
import { Box, Button, Chip, Container, MenuItem, OutlinedInput, Select, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppFormInput } from '../../solutions/components/app-form-input';
import { AppIcon } from '../../solutions/components/app-icon';
import { AppMapPopup } from '../../solutions/components/app-map-pop-up';
import { authSelectors } from '../auth/store';
import { postActions, postSelectors } from '../posts/store';
import styles from './styles.module.scss';
import * as utils from './utils';

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 28 * 4.5 + 8,
      width: 250,
    },
  },
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
      tags: [],
      categories: [],
    },
    onSubmit: (values) => {},
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const tags = useAppSelector(postSelectors.selectTags);
  const categories = useAppSelector(postSelectors.selectCategories);

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
    const payload = utils.constructPostPayload(form.values, currentUser.id);
    const response = await dispatch(postActions.createPostActionAsync(payload));
    if (response.meta.requestStatus === 'fulfilled') {
      navigate('/');
    }
  };

  const mapJson2Obj = (arr: string[]) => {
    return _.map(arr, (item) => JSON.parse(item));
  };

  const handleTagsChange = (event: any): void => {
    const { value } = event.target;
    form.setFieldValue('tags', value);
  };

  const handleCategoriesChange = (event: any): void => {
    const { value } = event.target;
    form.setFieldValue('categories', value);
  };

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
        <Box className={styles['form-control']}>
          <Select
            id='tags'
            multiple
            fullWidth
            value={form.values.tags}
            input={<OutlinedInput label='Choose tags' />}
            MenuProps={MenuProps}
            renderValue={(selectedValues: string[]) => {
              if (selectedValues.length) {
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {mapJson2Obj(selectedValues).map((value) => (
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
        </Box>
        <Box className={styles['form-control']}>
          <Select
            id='categories'
            multiple
            fullWidth
            placeholder='Choose categories'
            value={form.values.categories}
            input={<OutlinedInput label='Choose categories' />}
            MenuProps={MenuProps}
            renderValue={(selectedValues: string[]) => {
              if (selectedValues.length) {
                return (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {mapJson2Obj(selectedValues).map((value) => (
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
                  {category.categoryName}
                </MenuItem>
              ))}
          </Select>
        </Box>
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
