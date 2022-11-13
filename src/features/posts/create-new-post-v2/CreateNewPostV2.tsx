import { Add, Map, PostAdd, UploadFile } from '@mui/icons-material';
import {
  Box,
  Grid,
  Paper,
  Divider,
  TextField,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stack,
  Tooltip,
  IconButton,
} from '@mui/material';
import React, { ChangeEvent, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppMapBox, IPoint } from '../../../solutions/components/app-mapbox';
import { AppModal } from '../../../solutions/components/app-modal';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { categoriesActions, categoriesSelectors } from '../../categories/store';
import { tagsActions, tagSelectors } from '../../tags/store';
import { useNavigate } from 'react-router-dom';
import { AppSelect } from '../../../solutions/components/app-select';
import { useFormik } from 'formik';

const CreateNewPostV2 = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [contentType, setContentType] = useState('image');
  const [locationMode, setLocationMode] = useState('manual');
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [marker, setMarker] = useState<IPoint | null>(null);
  const categories = useAppSelector(categoriesSelectors.selectCategoryList);
  const hashtags = useAppSelector(tagSelectors.selectTagList);
  const form = useFormik({
    initialValues: {
      title: '',
      shortTitle: '',
    },
    onSubmit: async (value, { resetForm }) => {},
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
    setIsOpenMap(false);
  };

  useEffect(() => {
    dispatch(categoriesActions.getCategoryList());
    dispatch(tagsActions.getTagList());
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
          height: 'calc(100vh - 80px)',
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
                />
                <TextField
                  sx={{
                    display: 'block',
                    marginBottom: '12px',
                  }}
                  fullWidth
                  label='Short title'
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
                  {locationMode === 'manual' && (
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
                        />
                        <TextField
                          sx={{
                            display: 'block',
                          }}
                          fullWidth
                          label='Latitude'
                        />
                      </Stack>
                      <TextField
                        sx={{
                          display: 'block',
                          marginTop: '12px',
                        }}
                        fullWidth
                        label='Location'
                      />
                    </>
                  )}
                  {locationMode === 'select' && (
                    <Button
                      variant='contained'
                      onClick={openMap}
                      sx={{ textTransform: 'initial' }}
                      startIcon={<AppIcon icon={Map} color='#fff' />}
                    >
                      Select on map
                    </Button>
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
                    <IconButton size='large' color='info'>
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
                    <IconButton size='large' color='info'>
                      <AppIcon icon={Add} color='#0288d1' />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Grid>
              <Grid item sm={12} md={6}>
                <Box height='100%'>
                  <ReactQuill
                    theme='snow'
                    placeholder='Description (optional)'
                    style={{
                      height: '90%',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
          <Stack marginY={2}>
            <Button
              variant='contained'
              startIcon={<AppIcon icon={PostAdd} color='#fff' />}
              sx={{
                textTransform: 'inherit',
                fontSize: '18px',
              }}
            >
              Create
            </Button>
          </Stack>
        </Box>
      </Box>
      <AppModal isOpen={isOpenMap} title='Map' onClose={closeMap} onCancel={closeMap} width='1200px' okText='Select'>
        <AppMapBox mapHeight='600px' onClickOnMap={console.log} onSearchOnMap={console.log} />
      </AppModal>
    </>
  );
};

export default CreateNewPostV2;
