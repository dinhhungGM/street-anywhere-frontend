import { AddAPhoto, Bookmark, Feed, Image, People, Person, Upload, YouTube } from '@mui/icons-material';
import { Avatar, Box, Button, IconButton, Paper, Tab, Tabs, Typography } from '@mui/material';
import _ from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppIcon } from '../../solutions/components/app-icon';
import AppTabPanel from '../../solutions/components/app-tab-panel/AppTabPanel';
import { authSelectors } from '../auth/store';
import { ProfilePersonalInfo } from './profile-personal-info';
import * as profileAsyncActions from './profileDashboardAsyncActions';
import { ProfilePropertiesEnum } from './profileDashBoardModels';
import * as profileSelectors from './profileDashBoardSelectors';
import styles from './styles.module.scss';

const showSuccess = (message: string): void => {
  SweetAlert.fire({
    title: 'Success',
    icon: 'success',
    text: message,
  });
};

const showError = (message: string): void => {
  SweetAlert.fire({
    title: 'Error',
    icon: 'error',
    text: message,
  });
};

const ProfileDashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputFileRef = useRef<HTMLInputElement>();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const profileDetail = useAppSelector(profileSelectors.selectProfileDetail);
  const [file, setFile] = useState<File | null>(null);
  const [field, setField] = useState<ProfilePropertiesEnum | null>(null);
  const { userId } = useParams();
  const [tab, setTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  // File change
  const onFileChange = (event) => {
    const file = event.target.files[0] as File;
    if (!_.isNil(file)) {
      const isValidExt = ['image/gif', 'image/jpeg', 'image/png'].includes(file.type);
      if (isValidExt) {
        setFile(file);
      } else {
        showError('Invalid file type. It should be a image file');
      }
    }
  };

  // Update post
  const uploadImage = (field): void => {
    inputFileRef.current.click();
    setField(field);
  };

  // Load post and user information
  useEffect(() => {
    if (_.isNil(currentUser)) {
      navigate('/sign-in');
    } else {
      dispatch(profileAsyncActions.getAllPostsOfCurrentUser(currentUser.id));
      dispatch(profileAsyncActions.getProfileOfUser(+userId));
    }
  }, []);

  const isCurrentUser = useMemo(() => {
    return currentUser?.id === +userId;
  }, [currentUser?.id, userId]);

  // Update user
  useEffect(() => {
    const fileFields = [ProfilePropertiesEnum.Avatar, ProfilePropertiesEnum.CoverImage];
    const textFields = [
      ProfilePropertiesEnum.FirstName,
      ProfilePropertiesEnum.LastName,
      ProfilePropertiesEnum.Email,
      ProfilePropertiesEnum.Phone,
      ProfilePropertiesEnum.Bio,
    ];

    const reset = (): void => {
      setField(null);
      setFile(null);
    };

    const updateAvatarOrCoverImage = async () => {
      const formData = new FormData();
      formData.append(field, field);
      formData.append('file', file);
      const response = await dispatch(
        profileAsyncActions.updateUser({
          userId: currentUser.id,
          payload: formData,
          isFormData: true,
        }),
      );
      if (response.meta.requestStatus === 'fulfilled') {
        reset();
      }
    };

    const updateTextInfo = async () => {
      const payload = {
        userId: currentUser?.id,
        payload: {},
      };
    };

    if (file && field) {
      if (fileFields.includes(field)) {
        updateAvatarOrCoverImage();
      }
      if (textFields.includes(field)) {
        updateTextInfo();
      }
    }
  }, [file, field]);

  return (
    <>
      <Box className={styles['dashboard']}>
        <input type='file' accept='image/*' hidden ref={inputFileRef} onChange={onFileChange} />
        <Box
          sx={{
            height: '400px',
            background: profileDetail?.coverImageUrl ? `url(${ profileDetail?.coverImageUrl })` : '#ccc',
            borderRadius: 4,
            position: 'relative',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
          }}
          component={Paper}>
          {isCurrentUser && (
            <Button
              startIcon={<AppIcon icon={AddAPhoto} color='#fff' />}
              variant='contained'
              className={styles['dashboard-add-cover-image']}
              onClick={() => uploadImage(ProfilePropertiesEnum.CoverImage)}>
              Add cover image
            </Button>
          )}
        </Box>
        <Box className={styles['dashboard-user']}>
          <Box className={styles['dashboard-user-info']}>
            <Box
              sx={{
                position: 'relative',
              }}>
              <Avatar src={profileDetail?.profilePhotoUrl} className={styles['dashboard-user-avatar']} />
              {isCurrentUser && (
                <IconButton
                  size='medium'
                  className={styles['dashboard-user-upload']}
                  color='error'
                  onClick={() => uploadImage(ProfilePropertiesEnum.Avatar)}>
                  <AppIcon icon={Upload} color='#fff' />
                </IconButton>
              )}
            </Box>
            <Box
              marginLeft={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Typography variant='h5' fontWeight={700}>
                {currentUser?.fullName}
              </Typography>
              <Typography textAlign='center' marginTop={1}>
                0 Followers
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box className={styles['tab-container']}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            centered
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            indicatorColor='primary'>
            <Tab icon={<AppIcon icon={Person} />} label='Info' iconPosition='start' className={styles['tab-item']} />
            <Tab
              icon={<AppIcon icon={People} />}
              label='Followers'
              iconPosition='start'
              className={styles['tab-item']}
            />
            <Tab icon={<AppIcon icon={Image} />} label='Images' iconPosition='start' className={styles['tab-item']} />
            <Tab icon={<AppIcon icon={YouTube} />} label='Videos' iconPosition='start' className={styles['tab-item']} />
            {isCurrentUser && (
              <Tab
                icon={<AppIcon icon={Bookmark} />}
                label='Bookmark'
                iconPosition='start'
                className={styles['tab-item']}
              />
            )}
          </Tabs>
        </Box>
        <Box>
          <AppTabPanel value={tab} index={0}>
            <ProfilePersonalInfo isCurrentUser={isCurrentUser} profileDetail={profileDetail} />
          </AppTabPanel>
          <AppTabPanel value={tab} index={1}>
            value 2
          </AppTabPanel>
          <AppTabPanel value={tab} index={2}>
            value 3
          </AppTabPanel>
          <AppTabPanel value={tab} index={3}>
            value 4
          </AppTabPanel>
          <AppTabPanel value={tab} index={4}>
            value 5
          </AppTabPanel>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDashBoard;
