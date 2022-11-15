import { Add, Map, PostAdd, UploadFile } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import _ from 'lodash';
import { ChangeEvent, useEffect, useState, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppMapBox, IPoint } from '../../../solutions/components/app-mapbox';
import { AppModal } from '../../../solutions/components/app-modal';
import { AppSelect } from '../../../solutions/components/app-select';
import { authSelectors } from '../../auth/store';
import { categoriesActions, categoriesSelectors } from '../../categories/store';
import { tagsActions, tagSelectors } from '../../tags/store';
import * as yup from 'yup';
import { Marker } from 'mapbox-gl';

const CreateNewPostV2 = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [contentType, setContentType] = useState('image');
  const [locationMode, setLocationMode] = useState('manual');
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [marker, setMarker] = useState<IPoint | null>(null);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const categories = useAppSelector(categoriesSelectors.selectCategoryList);
  const hashtags = useAppSelector(tagSelectors.selectTagList);
  const form = useFormik({
    initialValues: {
      title: '',
      shortTitle: '',
      location: '',
      longitude: '',
      latitude: '',
      description: '',
    },
    onSubmit: async (value, { resetForm }) => {
      console.log('form value', value);
    },
    validationSchema: yup.object().shape({
      title: yup.string().trim().required('Required!').max(50, 'Can not be more than 50 characters'),
      shortTitle: yup.string().trim().required('Required!').max(20, 'Can not be more than 20 characters'),
      location: yup.string().trim().required('Required!'),
      longitude: yup.number().required('Required!').typeError('Invalid longitude value'),
      latitude: yup.number().required('Required!').typeError('Invalid latitude value'),
    }),
  });

  const changeContentType = (event: ChangeEvent<HTMLInputElement>): void => {
    setContentType((event.target as HTMLInputElement).value);
  };

  const changeLocationMode = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = (event.target as HTMLInputElement).value;
    setLocationMode(value);
  };

  const openMap = (): void => {
    setIsOpenMap(true);
  };

  const closeMap = (): void => {
    setMarker(null);
    setIsOpenMap(false);
  };

  const openCreateFormPopup = async (title: string, placeholder: string, maxLength: number, handlerFn?: any) => {
    const { value } = await SweetAlert.fire({
      title,
      input: 'text',
      inputPlaceholder: placeholder,
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Not empty';
        }
        if (value.length > maxLength) {
          return `Can not be more than ${maxLength} characters`;
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
      console.log('Create new category successfully');
    }
  };

  const createNewHashTag = async (hashtag: string) => {
    const response = await dispatch(tagsActions.createNewHashTag(hashtag));
    if (response.meta.requestStatus === 'fulfilled') {
      console.log('Create new hashtag successfully');
    }
  };

  const isInvalidControl = (ctlName: string): boolean => {
    return form.touched[ctlName] && form.errors[ctlName];
  };

  const getErrorMessage = (ctlName: string): string => {
    return form.touched[ctlName] && form.errors[ctlName];
  };

  const isFormValid = useMemo(() => {
    return form.dirty && form.isValid;
  }, [form.touched]);

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

  useEffect(() => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'You are not sign in. Please sign in to continue',
        confirmButtonText: 'Sign in',
        showCancelButton: true,
      }).then((status) => {
        if (!status.isConfirmed || status.isDismissed) {
          navigate('/');
        } else {
          navigate('/sign-in');
        }
      });
    } else {
      dispatch(categoriesActions.getCategoryList());
      dispatch(tagsActions.getTagList());
    }
  }, []);

  return (
    <>
      <Box
        padding={4}
        sx={{
          backgroundImage:
            'linear-gradient(43deg, rgb(65, 88, 208) 0%, rgb(200, 80, 192) 46%, rgb(255, 204, 112) 100%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100% - 80px)',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#fff',
            width: '80%',
            height: 'fit-content',
          }}
          padding={2}
          elevation={2}
          borderRadius={2}
          component={Paper}
        >
          <Typography textAlign='center' variant='h2' textTransform='uppercase' fontWeight={600}>
            New Post
          </Typography>
          <Divider>Information</Divider>
          <form onSubmit={form.handleSubmit}>
            <Box marginTop={2}>
              <Grid container spacing={2}>
                <Grid item sm={12} md={6}>
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
                  <TextField
                    sx={{
                      display: 'block',
                      marginBottom: '12px',
                    }}
                    fullWidth
                    label='Short title'
                    {...form.getFieldProps('shortTitle')}
                    error={isInvalidControl('shortTitle')}
                    helperText={getErrorMessage('shortTitle')}
                  />
                  <FormControl>
                    <FormLabel
                      id='demo-radio-buttons-group-label'
                      sx={{
                        fontWeight: 700,
                      }}
                    >
                      Content type
                    </FormLabel>
                    <RadioGroup
                      row
                      name='radio-buttons-group'
                      onChange={changeContentType}
                      value={contentType}
                      aria-labelledby='demo-radio-buttons-group-label'
                    >
                      <FormControlLabel value='image' control={<Radio />} label='Image' />
                      <FormControlLabel value='youtube' control={<Radio />} label='Youtube' />
                    </RadioGroup>
                  </FormControl>
                  <Box marginTop={1}>
                    {contentType === 'image' && (
                      <Button
                        type='button'
                        variant='contained'
                        startIcon={<AppIcon icon={UploadFile} color='#fff' />}
                        sx={{ textTransform: 'initial' }}
                      >
                        Upload image
                      </Button>
                    )}
                    {contentType === 'youtube' && (
                      <TextField
                        sx={{
                          display: 'block',
                          marginBottom: '12px',
                        }}
                        fullWidth
                        label='Youtube link'
                      />
                    )}
                  </Box>
                  <Box marginTop={1}>
                    <FormControl>
                      <FormLabel
                        id='location-mode'
                        sx={{
                          fontWeight: 700,
                        }}
                      >
                        Location
                      </FormLabel>
                      <RadioGroup
                        row
                        value={locationMode}
                        name='location-mode-group'
                        aria-labelledby='location-mode'
                        onChange={changeLocationMode}
                      >
                        <FormControlLabel value='manual' control={<Radio />} label='Enter manually' />
                        <FormControlLabel value='select' control={<Radio />} label='Select on map' />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Box marginTop={1}>
                    {(locationMode === 'manual' || marker) && (
                      <>
                        <Stack
                          direction='row'
                          spacing={3}
                          justifyContent='space-between'
                          alignItems='center'
                          marginTop={1}
                        >
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
                          label='Location'
                          {...form.getFieldProps('location')}
                          error={isInvalidControl('location')}
                          helperText={getErrorMessage('location')}
                        />
                      </>
                    )}
                    {locationMode === 'select' && (
                      <Box marginTop={marker ? 1 : 0}>
                        <Button
                          type='button'
                          variant='contained'
                          onClick={openMap}
                          sx={{ textTransform: 'initial' }}
                          startIcon={<AppIcon icon={Map} color='#fff' />}
                        >
                          Select on map
                        </Button>
                      </Box>
                    )}
                  </Box>
                  <Stack direction='row' alignItems='center' justifyContent='space-between' marginTop={1} spacing={2}>
                    <AppSelect
                      data={categories}
                      mappingLabelField='categoryName'
                      isMultipleSelect={true}
                      optionLabel='Categories'
                      value={undefined}
                    />
                    <Tooltip title='Add new category' placement='top'>
                      <IconButton
                        size='large'
                        color='info'
                        onClick={() => openCreateFormPopup('New category', 'Enter new category', 20, createNewCategory)}
                      >
                        <AppIcon icon={Add} color='#0288d1' />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  <Stack direction='row' alignItems='center' justifyContent='space-between' marginTop={1} spacing={2}>
                    <AppSelect
                      data={hashtags}
                      mappingLabelField='tagName'
                      isMultipleSelect={true}
                      optionLabel='Hashtags'
                      value={undefined}
                    />
                    <Tooltip title='Add new hashtag' placement='top'>
                      <IconButton
                        size='large'
                        color='info'
                        onClick={() => openCreateFormPopup('New hashtag', 'Enter new hashtag', 10, createNewHashTag)}
                      >
                        <AppIcon icon={Add} color='#0288d1' />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Grid>
                <Grid item sm={12} md={6}>
                  <Box height='100%'>
                    <ReactQuill
                      id='description'
                      theme='snow'
                      placeholder='Description (optional)'
                      style={{
                        height: '90%',
                      }}
                      value={form.values.description}
                      onChange={form.handleChange}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Stack marginTop={2}>
              <Button
                type='submit'
                variant='contained'
                startIcon={<AppIcon icon={PostAdd} color='#fff' />}
                sx={{
                  textTransform: 'inherit',
                  fontSize: '18px',
                }}
                disabled={!isFormValid}
              >
                Create
              </Button>
            </Stack>
          </form>
        </Box>
      </Box>
      <AppModal
        isOpen={isOpenMap}
        title='Map'
        onClose={closeMap}
        onCancel={closeMap}
        width='1200px'
        okText='Select'
        onOk={handleOnSelectPoint}
      >
        <AppMapBox mapHeight='600px' onClickOnMap={handleClickOnMap} onSearchOnMap={handleOnSearchOnMap} />
      </AppModal>
    </>
  );
};

export default CreateNewPostV2;
