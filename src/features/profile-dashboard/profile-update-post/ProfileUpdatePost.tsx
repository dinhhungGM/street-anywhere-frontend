import { Add, ExpandMore, Map, PostAdd } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import _ from 'lodash';
import { Marker } from 'mapbox-gl';
import { useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppIconButton } from '../../../solutions/components/app-icon-button';
import { AppMapBox, IPoint } from '../../../solutions/components/app-mapbox';
import { AppModal } from '../../../solutions/components/app-modal';
import { AppSelect } from '../../../solutions/components/app-select';
import { authSelectors } from '../../auth/store';
import { categoriesActions, categoriesSelectors } from '../../categories/store';
import { ICategory } from '../../categories/store/categoriesModels';
import { postActions } from '../../posts/store';
import { tagsActions, tagSelectors } from '../../tags/store';
import { ITag } from '../../tags/store/tagModels';
import styles from './styles.module.scss';

const contentTypeOptions = [
  {
    id: 1,
    value: 'image',
    label: 'Image Link',
  },
  {
    id: 2,
    value: 'upload',
    label: 'Upload image',
  },
  {
    id: 3,
    value: 'video',
    label: 'Video',
  },
];

const showError = (errorMessage: string): void => {
  SweetAlert.fire({
    title: 'Error',
    icon: 'error',
    text: errorMessage,
  });
};

const showSuccess = (message: string): void => {
  SweetAlert.fire({
    title: 'Success',
    icon: 'success',
    text: message,
  });
};

const ProfileUpdatePost = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [marker, setMarker] = useState<IPoint | null>(null);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const categories = useAppSelector(categoriesSelectors.selectCategoryList);
  const hashtags = useAppSelector(tagSelectors.selectTagList);
  const form = useFormik({
    initialValues: {
      title: '',
      location: '',
      longitude: '',
      latitude: '',
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('shortTitle', values.title);
      formData.append('userId', currentUser.id.toString());

      // Check location
      const { longitude, latitude, location } = values;
      const isValidLong = longitude && longitude.trim();
      const isValidLat = latitude && latitude.trim();
      const isValidAddress = location && location.trim();
      if (isValidLong && isValidLat && isValidAddress) {
        formData.append('longitude', values.longitude);
        formData.append('latitude', values.latitude);
        formData.append('location', values.location);
      }

      // Check description
      if (description) {
        formData.append('description', encodeURIComponent(description));
      }

      // Success
      const tagIds = _.map(selectedHashtags, 'id');
      const categoryIds = _.map(selectedCategories, 'id');
      formData.append('tags', JSON.stringify(tagIds));
      formData.append('categories', JSON.stringify(categoryIds));
      const result = await dispatch(postActions.createPostActionAsync(formData));
      if (result.meta.requestStatus === 'fulfilled') {
        showSuccess('Create successfully');
        navigate('/home');
      }
    },
    validationSchema: yup.object().shape({
      title: yup
        .string()
        .trim()
        .required('Required!')
        .max(100, 'Can not be more than 100 characters'),
    }),
  });
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<ITag[]>([]);
  const [description, setDescription] = useState('');
  const { userId, postId } = useParams();

  const openMap = (): void => {
    setIsOpenMap(true);
  };

  const closeMap = (): void => {
    setMarker(null);
    setIsOpenMap(false);
  };

  const openCreateFormPopup = async (
    title: string,
    placeholder: string,
    maxLength: number,
    handlerFn?: any,
  ) => {
    const { value } = await SweetAlert.fire({
      title,
      input: 'text',
      inputPlaceholder: placeholder,
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Not empty';
        }
        if (value.length > maxLength) {
          return `Can not be more than ${ maxLength } characters`;
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Create',
      confirmButtonColor: '#0288d1',
    });
    if (!_.isNil(value)) {
      handlerFn(value);
    }
  };

  const createNewCategory = async (categoryName: string) => {
    const response = await dispatch(categoriesActions.createNewCategory(categoryName));
    if (response.meta.requestStatus === 'fulfilled') {
      setSelectedCategories([...selectedCategories, response.payload]);
    }
  };

  const createNewHashTag = async (hashtag: string) => {
    const response = await dispatch(tagsActions.createNewHashTag(hashtag));
    if (response.meta.requestStatus === 'fulfilled') {
      setSelectedHashtags([...selectedHashtags, response.payload]);
    }
  };

  const isInvalidControl = (ctlName: string): boolean => {
    return !!form.touched[ctlName] && !!form.errors[ctlName];
  };

  const getErrorMessage = (ctlName: string): string => {
    return form.touched[ctlName] && form.errors[ctlName];
  };

  const selectedMarker = useMemo(() => {
    return new Marker();
  }, []);

  const handleClickOnMap = (event) => {
    const {
      lngLat: { lat, lng },
      target: map,
    } = event;
    selectedMarker.setLngLat([lng, lat]).addTo(map);
    setMarker({ ...marker, lat, long: lng });
  };

  const handleOnSearchOnMap = (event) => {
    const [long, lat] = event.result.center;
    const location = event.result['place_name_en-US'];
    if (long && lat && location) {
      setMarker({ ...marker, long, lat, location });
    }
  };

  const handleOnSelectPoint = () => {
    if (_.isNil(marker)) {
      return;
    }
    form.setValues({
      ...form.values,
      longitude: marker.long.toString(),
      latitude: marker.lat.toString(),
      location: marker.location,
    });
    setIsOpenMap(false);
  };

  const handleHashTagChange = (_, newValues): void => {
    setSelectedHashtags(newValues);
  };

  const handleCategoryChange = (_, newValues): void => {
    setSelectedCategories(newValues);
  };

  useEffect(() => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'You are not sign in. Please sign in to continue',
        confirmButtonText: 'Sign in',
        showCancelButton: true,
      })
        .then((status) => {
          if (!status.isConfirmed || status.isDismissed) {
            navigate('/');
          } else {
            navigate('/sign-in');
          }
        })
        .then(() => {
          navigate(-1);
        });
    } else if (currentUser?.id !== +userId) {
      SweetAlert.fire({
        title: 'Error',
        icon: 'error',
        text: "You cannot edit other people's posts",
      });
    } else {
      dispatch(categoriesActions.getCategoryList());
      dispatch(tagsActions.getTagList());
    }
  }, []);

  return (
    <>
      <Box padding={4} className={styles.wrapper}>
        <Box
          sx={{
            backgroundColor: '#fff',
            width: {
              sm: '100%',
              md: '80%',
              lg: '50%',
            },
          }}
          padding={2}
          elevation={2}
          borderRadius={2}
          component={Paper}>
          <Typography textAlign='center' variant='h2' textTransform='uppercase' fontWeight={600}>
            Update Post
          </Typography>
          <Divider>
            <Typography fontWeight={700}>Content</Typography>
          </Divider>
          <form onSubmit={form.handleSubmit} style={{ width: '100%' }}>
            <Box marginTop={2} width='100%'>
              <Grid container width='100%'>
                <Grid item xs={12} sm={12} md={12} alignItems='center' justifyContent='center'>
                  <TextField
                    sx={{
                      display: 'block',
                      marginBottom: '12px',
                    }}
                    fullWidth
                    label='Title'
                    {...form.getFieldProps('title')}
                    error={isInvalidControl('title')}
                    helperText={getErrorMessage('title')}
                  />
                  <Divider>
                    <Typography fontWeight={700}>Optional Information</Typography>
                  </Divider>
                  <Box marginTop={1}>
                    <Accordion TransitionProps={{ unmountOnExit: true }}>
                      <AccordionSummary
                        expandIcon={<AppIcon icon={ExpandMore} />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'>
                        <Typography fontWeight={700}>Add location</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack
                          direction='row'
                          spacing={3}
                          justifyContent='space-between'
                          alignItems='center'
                          marginTop={1}>
                          <TextField
                            sx={{
                              display: 'block',
                            }}
                            fullWidth
                            label='Longitude'
                            {...form.getFieldProps('longitude')}
                            error={isInvalidControl('longitude')}
                            helperText={getErrorMessage('longitude')}
                          />
                          <TextField
                            sx={{
                              display: 'block',
                            }}
                            fullWidth
                            label='Latitude'
                            {...form.getFieldProps('latitude')}
                            error={isInvalidControl('latitude')}
                            helperText={getErrorMessage('latitude')}
                          />
                        </Stack>
                        <TextField
                          sx={{
                            display: 'block',
                            marginTop: '12px',
                          }}
                          fullWidth
                          label='Address'
                          {...form.getFieldProps('location')}
                          error={isInvalidControl('location')}
                          helperText={getErrorMessage('location')}
                        />
                        <Box marginTop={1}>
                          <Button
                            type='button'
                            variant='contained'
                            onClick={openMap}
                            sx={{ textTransform: 'initial' }}
                            startIcon={<AppIcon icon={Map} color='#fff' />}>
                            Select on map
                          </Button>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                  <Box marginTop={1}>
                    <Accordion TransitionProps={{ unmountOnExit: true }}>
                      <AccordionSummary
                        expandIcon={<AppIcon icon={ExpandMore} />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'>
                        <Typography fontWeight={700}>Add Categories & tags</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Stack
                          direction='row'
                          alignItems='center'
                          justifyContent='space-between'
                          spacing={2}>
                          <AppSelect
                            data={categories}
                            mappingLabelField='categoryName'
                            isMultipleSelect={true}
                            optionLabel='Categories'
                            value={selectedCategories}
                            onChange={handleCategoryChange}
                          />
                          <AppIconButton
                            tooltip='Add new category'
                            icon={<AppIcon icon={Add} color='#0288d1' />}
                            buttonColor='info'
                            onClick={() =>
                              openCreateFormPopup(
                                'New category',
                                'Enter new category',
                                20,
                                createNewCategory,
                              )
                            }
                          />
                        </Stack>
                        <Stack
                          direction='row'
                          alignItems='center'
                          justifyContent='space-between'
                          marginTop={2}
                          spacing={2}>
                          <AppSelect
                            data={hashtags}
                            mappingLabelField='tagName'
                            isMultipleSelect={true}
                            optionLabel='Hashtags'
                            value={selectedHashtags}
                            onChange={handleHashTagChange}
                          />
                          <AppIconButton
                            tooltip='Add new hashtag'
                            icon={<AppIcon icon={Add} color='#0288d1' />}
                            buttonColor='info'
                            onClick={() =>
                              openCreateFormPopup(
                                'New hashtag',
                                'Enter new hashtag',
                                10,
                                createNewHashTag,
                              )
                            }
                          />
                        </Stack>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                  <Box marginTop={1} height='fit-content'>
                    <Accordion TransitionProps={{ unmountOnExit: true }}>
                      <AccordionSummary
                        expandIcon={<AppIcon icon={ExpandMore} />}
                        aria-controls='panel1a-content'
                        id='panel1a-header'>
                        <Typography fontWeight={700}>Add description</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Box height='600px' width='100%'>
                          <ReactQuill
                            id='description'
                            theme='snow'
                            placeholder='Description (optional)'
                            className={styles['text-editor']}
                            value={description}
                            onChange={setDescription}
                          />
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                  <Stack marginTop={2} width='100%'>
                    <Button
                      type='submit'
                      variant='contained'
                      startIcon={<AppIcon icon={PostAdd} color='#fff' />}
                      sx={{
                        textTransform: 'inherit',
                        fontSize: '18px',
                      }}>
                      Create
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Box>
      <AppModal
        isOpen={isOpenMap}
        title='Map'
        onClose={closeMap}
        onCancel={closeMap}
        width='60vw'
        height='60vh'
        okText='Select'
        onOk={handleOnSelectPoint}>
        <Box height='60vh'>
          <AppMapBox onClickOnMap={handleClickOnMap} onSearchOnMap={handleOnSearchOnMap} />
        </Box>
      </AppModal>
    </>
  );
};

export default ProfileUpdatePost;
