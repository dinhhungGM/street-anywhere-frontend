import { Add, Delete, ExpandMore, Map, PostAdd } from '@mui/icons-material';
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
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
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
import { postActions, postSelectors } from '../../posts/store';
import { tagsActions, tagSelectors } from '../../tags/store';
import { ITag } from '../../tags/store/tagModels';
import styles from './styles.module.scss';

const ProfileUpdatePost = () => {
  const descRef = useRef();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId, postId } = useParams();
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [description, setDescription] = useState('');
  const [marker, setMarker] = useState<IPoint | null>(null);
  const hashtags = useAppSelector(tagSelectors.selectTagList);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const categories = useAppSelector(categoriesSelectors.selectCategoryList);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const [selectedHashtags, setSelectedHashtags] = useState<ITag[]>([]);
  const currentPost = useAppSelector(postSelectors.selectSelectedPost);
  const form = useFormik({
    initialValues: {
      title: '',
      location: '',
      longitude: '',
      latitude: '',
    },
    onSubmit: async (values) => {
      const payload = {};
      const { title, location, longitude, latitude } = values;
      // Check title, location
      if (!_.isEqual(title, currentPost?.title)) {
        payload['title'] = values.title;
      }
      // Check location
      const isEmptyAll = Boolean(!location.trim() && !longitude.trim() && !latitude.trim());
      const isDirtyAll = Boolean(location && longitude && latitude);
      const isDirty = [location, latitude, longitude].some((data) => data.trim());
      const newLocation = { location, longitude, latitude };
      if (isEmptyAll && currentPost.isHasLocation) {
        for (const field of Object.keys(newLocation)) {
          payload[field] = null;
        }
      } else if (isDirtyAll) {
        for (const field of Object.keys(newLocation)) {
          const newVal = newLocation[field];
          const currVal = `${ currentPost[field] }`;
          if (!_.isEqual(newVal, currVal)) {
            payload[field] = newVal;
          }
        }
      } else if (isDirty) {
        // For case, at least one field was filled
        SweetAlert.fire({ title: 'Info', icon: 'info', text: 'Please fill all location data' });
        return;
      }
      // Check categories
      const newCates = _.map(selectedCategories, 'categoryName');
      if (!_.isEqual(newCates, currentPost?.categories)) {
        const listId = _.map(selectedCategories, 'id');
        payload['categories'] = listId;
      }
      // Check tags
      const newTags = _.map(selectedHashtags, 'tagName');
      if (!_.isEqual(newTags, currentPost?.tags)) {
        const listId = _.map(selectedHashtags, 'id');
        payload['tags'] = listId;
      }
      // Check description
      if (!_.isEqual(description, currentPost?.description)) {
        payload['description'] = description;
      }
      if (Object.keys(payload).length) {
        const res = await dispatch(postActions.updatePost({ postId: currentPost?.id, payload }));
        if (res.meta.requestStatus === 'fulfilled') {
          navigate(-1);
        }
      } else {
        SweetAlert.fire({
          title: 'Success',
          icon: 'success',
          text: 'Nothing changes',
        }).then(() => {
          navigate(-1);
        });
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

  const openMap = useCallback((): void => {
    setIsOpenMap(true);
  }, []);

  const closeMap = useCallback((): void => {
    setMarker(null);
    setIsOpenMap(false);
  }, []);

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

  const isHasLocation = (): boolean => {
    const { location, latitude, longitude } = form.values;
    return Boolean(location?.trim() || latitude?.trim() || longitude?.trim());
  };

  const removeLocation = (): void => {
    const values = form.values;
    form.setValues({
      ...values,
      location: '',
      latitude: '',
      longitude: '',
    });
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
      dispatch(postActions.getPostByIdAsync(+postId));
    }
  }, []);

  useEffect(() => {
    if (currentPost) {
      // set title for post
      const {
        title,
        latitude,
        location,
        longitude,
        tags: postTags,
        description: desc,
        categories: postCategories,
      } = currentPost;
      form.setValues({
        title: title || '',
        location: location || '',
        latitude: latitude ? latitude.toString() : '',
        longitude: longitude ? longitude.toString() : '',
      });
      // Set categories
      const currCategories = _.map(postCategories, (cate) => {
        const category = _.find(categories, (item) => item.categoryName === cate);
        return category;
      });
      setSelectedCategories(currCategories);
      // Set hashtags
      const currTags = _.map(postTags, (tag) => {
        const category = _.find(hashtags, (item) => item.tagName === tag);
        return category;
      });
      setSelectedHashtags(currTags);
      // set description
      if (desc) {
        setDescription(desc);
      }
    }
  }, [currentPost]);

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
                  <Box marginY={1} className={styles['post-content']} component={Paper}>
                    {currentPost?.type === 'video' ? (
                      <ReactPlayer
                        url={currentPost?.videoYtbUrl}
                        light
                        width='100%'
                        height='100%'
                      />
                    ) : (
                      <img src={currentPost?.imageUrl} alt={currentPost?.title} />
                    )}
                  </Box>
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
                          {isHasLocation() && (
                            <Button
                              type='button'
                              variant='contained'
                              color='error'
                              onClick={removeLocation}
                              sx={{ textTransform: 'initial', ml: 1 }}
                              startIcon={<AppIcon icon={Delete} color='#fff' />}>
                              Clear
                            </Button>
                          )}
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
                        <Typography fontWeight={700}>Add categories & tags</Typography>
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
                            ref={descRef}
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
                      Update
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
        height='60vh !important'
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
