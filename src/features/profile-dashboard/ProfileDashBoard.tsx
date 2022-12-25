import {
  AddAPhoto,
  Bookmark,
  Image,
  People,
  Person,
  PersonAdd,
  Upload,
  YouTube,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { profileActions } from '.';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppIcon } from '../../solutions/components/app-icon';
import { authSelectors } from '../auth/store';
import { userSelectors } from '../user';
import { userActions } from './../user';
import * as profileAsyncActions from './profileDashboardAsyncActions';
import { ProfilePropertiesEnum } from './profileDashBoardModels';
import * as profileSelectors from './profileDashBoardSelectors';
import { profileSyncActions } from './profileDashboardSlice';
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
  const followerCount = useAppSelector(profileSelectors.selectFollowerCount);
  const followingUsers = useAppSelector(userSelectors.selectedFollowingUsers);
  const [file, setFile] = useState<File | null>(null);
  const [field, setField] = useState<ProfilePropertiesEnum | null>(null);
  const { userId } = useParams();
  const [tab, setTab] = useState(0);
  const location = useLocation();

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
    dispatch(profileActions.getAllPostsOfCurrentUser(+userId));
    dispatch(profileActions.getProfileOfUser(+userId));
    dispatch(profileActions.getFollowerCount(+userId));
    if (currentUser) {
      dispatch(userActions.getFollowingUsers(currentUser?.id));
    }
    return () => {
      dispatch(profileSyncActions.resetProfileDetail());
    };
  }, []);

  const isCurrentUser = useMemo(() => {
    return currentUser?.id === +userId;
  }, [currentUser?.id, userId]);

  useEffect(() => {
    if (location.pathname.includes('followers')) {
      setTab(1);
    } else if (location.pathname.includes('posts') && location.search.includes('image')) {
      setTab(2);
    } else if (location.pathname.includes('posts') && location.search.includes('video')) {
      setTab(3);
    } else if (location.pathname.includes('bookmark')) {
      setTab(4);
    } else {
      setTab(0);
    }
  }, [location.pathname]);

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

  const handleNavigate = (path): void => {
    navigate(path);
  };

  // Handling display follow button
  const follower = useMemo(() => {
    if (!followingUsers || !followingUsers.length) {
      return null;
    }
    if (!currentUser) {
      return null;
    }
    return _.find(followingUsers, (user) => user.followerId === +userId);
  }, [userId, followingUsers, currentUser]);

  // Handling follow user
  const handlingFollower = () => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Notification',
        icon: 'warning',
        text: 'You are not sign in',
        confirmButtonText: 'Sign in',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/sign-in');
        }
      });
    } else {
      if (follower) {
        dispatch(
          userActions.unfollowUser({ userId: currentUser?.id, followerId: profileDetail.id }),
        );
      } else {
        dispatch(userActions.followUser({ userId: currentUser?.id, followerId: profileDetail.id }));
      }
    }
  };

  return (
    <>
      <Box className={styles['dashboard']}>
        <input type='file' accept='image/*' hidden ref={inputFileRef} onChange={onFileChange} />
        <Box
          sx={{
            width: '100%',
            height: '400px',
            background: profileDetail?.coverImageUrl
              ? `url(${ profileDetail?.coverImageUrl })`
              : '#ccc',
            borderRadius: 4,
            position: 'relative',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
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
              <Avatar
                src={profileDetail?.profilePhotoUrl}
                className={styles['dashboard-user-avatar']}
              />
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
                {profileDetail?.fullName}
              </Typography>
              <Typography textAlign='center' marginTop={1}>
                {followerCount} Followers
              </Typography>
              {!isCurrentUser ? (
                <Stack marginY={1} alignItems='center' justifyContent='center'>
                  <Button
                    color={follower ? 'error' : 'primary'}
                    startIcon={<AppIcon icon={PersonAdd} color='#fff' />}
                    variant='contained'
                    onClick={handlingFollower}>
                    {follower ? 'Unfollow' : 'Follow'}
                  </Button>
                </Stack>
              ) : null}
            </Box>
          </Box>
        </Box>
        <Box className={styles['tab-container']}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            variant='scrollable'
            scrollButtons='auto'
            allowScrollButtonsMobile
            indicatorColor='primary'>
            <Tab
              icon={<AppIcon icon={Person} />}
              label='Info'
              iconPosition='start'
              className={styles['tab-item']}
              onClick={() => handleNavigate(`/profile/${ userId }`)}
            />
            <Tab
              icon={<AppIcon icon={People} />}
              label='Followers'
              iconPosition='start'
              className={styles['tab-item']}
              onClick={() => handleNavigate(`/profile/${ userId }/followers`)}
            />
            <Tab
              icon={<AppIcon icon={Image} />}
              label='Images'
              iconPosition='start'
              className={styles['tab-item']}
              onClick={() => handleNavigate(`/profile/${ userId }/posts?mediatype=image`)}
            />
            <Tab
              icon={<AppIcon icon={YouTube} />}
              label='Videos'
              iconPosition='start'
              className={styles['tab-item']}
              onClick={() => handleNavigate(`/profile/${ userId }/posts?mediatype=video`)}
            />
            {isCurrentUser && (
              <Tab
                icon={<AppIcon icon={Bookmark} />}
                label='Bookmark'
                iconPosition='start'
                className={styles['tab-item']}
                onClick={() => handleNavigate(`/profile/${ userId }/bookmark`)}
              />
            )}
          </Tabs>
        </Box>
        <Box marginY={2} className={styles['profile-content']}>
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default ProfileDashBoard;
