import { Close, Image, Map, PlayCircleFilled, Upload } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Chip, FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import cx from 'classnames';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppMapPopup } from '../../../solutions/components/app-map-pop-up';
import AlertUtil from '../../../solutions/utils/alertUtil';
import { authSelectors } from '../../auth/store';
import { categoriesActions, categoriesSelectors } from '../../categories/store';
import { tagsActions, tagSelectors } from '../../tags/store';
import { postActions } from '../store';
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
const ytbUrlRegex =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

const CreateNewPost = () => {
  //#region Initialize hook
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const tags = useAppSelector(tagSelectors.selectTagList);
  const categories = useAppSelector(categoriesSelectors.selectCategoryList);
  //#endregion

  //#region Initial state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [typeUpload, setTypeUpload] = useState('image');
  const [currentLongitude, setCurrentLongitude] = useState<number | null>(null);
  const [currentLatitude, setCurrentLatitude] = useState<number | null>(null);
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
      ytbVideoUrl: '',
      tags: [],
      categories: [],
    },
    onSubmit: (values) => {},
    validationSchema: yup.object({
      title: yup.string().required('Required!').max(100, 'The title should not be more than 100 characters'),
      shortTitle: yup.string().required('Required').max(30, 'The short title should not be more than 50 characters'),
      location: yup.string().required('Required'),
      longitude: yup.number().required('Required'),
      latitude: yup.number().required('Required'),
      file: yup.object().required('Required'),
      categories: yup.array().required('Required'),
      ytbVideoUrl: yup.string().matches(ytbUrlRegex, 'Youtube video url invalid'),
    }),
  });

  const handleFileChanges = (event: any): void => {
    const file = event.target.files[0];
    if (file && utils.isValidFileType(file.type)) {
      form.setFieldValue('file', file);
      setSelectedFile(file);
    } else {
      AlertUtil.showError(new Error('Invalid file. Please choose an image!'));
    }
  };

  const handleCancelFile = (): void => {
    form.setFieldValue('file', '');
    setSelectedFile(null);
  };

  const handleCreateNewPost = async () => {
    const payload = utils.constructPostPayload(form.values, currentUser.id, typeUpload);
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

  const handleTypeUploadChange = (_, newTypeUpload): void => {
    if (!newTypeUpload) {
      return;
    }
    setTypeUpload(newTypeUpload);
    if (newTypeUpload === 'image') {
      form.setFieldValue('ytbVideoUrl', '');
    } else {
      form.setFieldValue('file', '');
      setSelectedFile(null);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentLongitude(+position.coords.longitude);
      setCurrentLatitude(+position.coords.latitude);
    });
    if (currentUser) {
      dispatch(tagsActions.getTagList());
      dispatch(categoriesActions.getCategoryList());
    } else {
      navigate('/sign-in');
    }
  }, []);

  return (
    <>
      <Box padding={4} className={styles['form']}>
        <Typography textAlign='center' variant='h3' marginBottom={2}>
          Create new post
        </Typography>
        <Grid container spacing={4}>
          <Grid item md={6} sm={12}>
            <Box className={styles['form-group']}>
              <AppFormInput
                form={form}
                formControlName='title'
                label='Title'
                placeholder='Please fill the main title of your post (*)'
              />
            </Box>
            <Box className={styles['form-group']}>
              <AppFormInput
                form={form}
                formControlName='shortTitle'
                label='Short title'
                placeholder='Please fill the short title of your post (*)'
                helperText='Should be no more than 20 characters'
              />
            </Box>
            <Box className={cx(styles['form-group'], styles['form-group--description'])}>
              <textarea
                {...form.getFieldProps('description')}
                rows={6}
                cols={50}
                className={styles['form-control']}
                placeholder='Description (optional)'
              />
            </Box>
            <FormControl className={styles['form-group']}>
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
                      <Checkbox checked={form.values.tags.includes(JSON.stringify(tag))} />
                      <ListItemText primary={tag.tagName} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl className={styles['form-group']}>
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
                      <Checkbox checked={form.values.categories.includes(JSON.stringify(category))} />
                      <ListItemText primary={category.categoryName} />
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={6} sm={12}>
            <Box className={styles['form-group']}>
              <AppFormInput
                form={form}
                formControlName='location'
                label='Location'
                placeholder='Please fill the location of your post (*)'
              />
            </Box>
            <Stack direction='row'>
              <Box className={styles['form-group']} width='40%'>
                <AppFormInput form={form} formControlName='longitude' label='Longitude (*)' disabled />
              </Box>
              <Box className={styles['form-group']} width='40%'>
                <AppFormInput form={form} formControlName='latitude' label='Latitude (*)' disabled />
              </Box>
              <Stack
                className={cx(styles['form-group'], styles['form-group--map'])}
                width='20%'
                alignItems='center'
                justifyContent='flex-end'
              >
                <Button
                  variant='contained'
                  startIcon={<AppIcon icon={Map} color='#fff' />}
                  onClick={() => setIsOpenMap(true)}
                  className={styles['btn-select-map']}
                >
                  Select on map
                </Button>
                <AppMapPopup
                  currentLatitude={currentLatitude}
                  currentLongitude={currentLongitude}
                  isOpen={isOpenMap}
                  onClose={handleCloseAppMapPopup}
                  onSelect={handleOnSelectPoint}
                  zoom={currentLatitude && currentLongitude && 13}
                />
              </Stack>
            </Stack>
            <Box className={styles['form-group']}>
              <ToggleButtonGroup
                value={typeUpload}
                exclusive
                onChange={handleTypeUploadChange}
                aria-label='type upload'
                color='primary'
              >
                <ToggleButton value='image' aria-label='image'>
                  <AppIcon icon={Image} color='#9391fd' />
                  <Typography marginLeft={2} textTransform='capitalize'>
                    Image
                  </Typography>
                </ToggleButton>
                <ToggleButton value='video' aria-label='video'>
                  <AppIcon icon={PlayCircleFilled} color='#e60023' />
                  <Typography marginLeft={2} textTransform='capitalize'>
                    Video
                  </Typography>
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Box className={styles['form-group']}>
              {typeUpload === 'image' && (
                <>
                  {!selectedFile ? (
                    <Button variant='contained' component='label' startIcon={<AppIcon icon={Upload} color='#fff' />}>
                      Upload
                      <input hidden accept='image/*' type='file' onChange={handleFileChanges} />
                    </Button>
                  ) : (
                    <>
                      <Stack spacing={2} direction='row' alignItems='center'>
                        <Typography>{selectedFile.name}</Typography>
                        <Button
                          startIcon={<AppIcon icon={Close} color='#e60023' />}
                          color='error'
                          onClick={handleCancelFile}
                        >
                          Cancel
                        </Button>
                      </Stack>
                    </>
                  )}
                </>
              )}
              {typeUpload === 'video' && (
                <AppFormInput form={form} formControlName='ytbVideoUrl' label='Youtube video url' />
              )}
            </Box>
          </Grid>
        </Grid>
        <Box justifyContent='flex-end' display='flex'>
          <Button
            variant='contained'
            color='primary'
            onClick={handleCreateNewPost}
            className={styles['btn-submit']}
            size='large'
          >
            Create
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default CreateNewPost;
