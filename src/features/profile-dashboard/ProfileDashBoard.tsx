import {
  AccountCircle,
  Add,
  AddAPhoto,
  AddReaction,
  Bookmark,
  Comment,
  Diversity1,
  Email,
  Info,
  InsertLink,
  Password,
  Phone,
  Search,
  Upload,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppIcon } from '../../solutions/components/app-icon';
import { AppInfoWidget } from '../../solutions/components/app-info-widget';
import { AppProfileInfo } from '../../solutions/components/AppProfileInfo';
import { authSelectors } from '../auth/store';
import NoDataFoundImage from './../../solutions/assets/images/no-data-found.png';
import { MyPost } from './my-post';
import { ProfileItem } from './profile-item';
import * as profileAsyncActions from './profileDashboardAsyncActions';
import { IMyPost } from './profileDashBoardModels';
import * as profileSelectors from './profileDashBoardSelectors';
import styles from './styles.module.scss';
import { ProfilePropertiesEnum } from './profileDashBoardModels';
import UpdateProfileModal from './update-profile-modal/UpdateProfileModal';

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
  const posts = useAppSelector(profileSelectors.selectPostsOfCurrentUser);
  const profileDetail = useAppSelector(profileSelectors.selectProfileDetail);
  const [search, setSearch] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [field, setField] = useState<ProfilePropertiesEnum | null>(null);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState<boolean>(false);
  const [fieldName, setFieldName] = useState<string | null>(null);

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

  // Delete post
  const deletePost = async (postId: number) => {
    SweetAlert.fire({
      icon: 'warning',
      title: 'Confirm',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#e60023',
      text: 'Are you sure to remove this post?',
    })
      .then((status) => {
        if (status.isConfirmed) {
          return dispatch(profileAsyncActions.deletePostById(postId));
        }
        return null;
      })
      .then((prevValue) => {
        if (prevValue) {
          if (prevValue.meta.requestStatus === 'fulfilled') {
            showSuccess('Delete post successfully');
            dispatch(profileAsyncActions.getAllPostsOfCurrentUser(currentUser.id));
          }
        }
      });
  };
  // Update post
  const uploadImage = (field): void => {
    inputFileRef.current.click();
    setField(field);
  };

  // Filter post
  const displayPosts = useMemo(() => {
    const filterPosts = _.filter(posts, (post) => {
      if (!search.trim() || !post || !posts.length) {
        return true;
      }
      const regex = new RegExp(search, 'i');
      const isMatch = post.shortTitle.match(regex) || post.title.match(regex);
      return isMatch;
    });
    return filterPosts as IMyPost[];
  }, [posts, search]);

  // Update text field
  const showUpdateModal = (field: ProfilePropertiesEnum, fieldName: string): void => {
    setIsOpenUpdateModal(true);
    setField(field);
    setFieldName(fieldName);
  };

  const hideUpdateModal = (): void => {
    setIsOpenUpdateModal(false);
    setField(null);
    setFieldName(null);
  };

  // Load post and user information
  useEffect(() => {
    if (_.isNil(currentUser)) {
      navigate('/sign-in');
    } else {
      dispatch(profileAsyncActions.getAllPostsOfCurrentUser(currentUser.id));
      dispatch(profileAsyncActions.getProfileOfUser(currentUser.id));
    }
  }, []);

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
          <Button
            startIcon={<AppIcon icon={AddAPhoto} color='#fff' />}
            variant='contained'
            className={styles['dashboard-add-cover-image']}
            onClick={() => uploadImage(ProfilePropertiesEnum.CoverImage)}>
            Add cover image
          </Button>
        </Box>
        <Box className={styles['dashboard-user']}>
          <Box className={styles['dashboard-user-info']}>
            <Box
              sx={{
                position: 'relative',
              }}>
              <Avatar src={profileDetail?.profilePhotoUrl} className={styles['dashboard-user-avatar']} />
              <IconButton
                size='medium'
                className={styles['dashboard-user-upload']}
                color='error'
                onClick={() => uploadImage(ProfilePropertiesEnum.Avatar)}>
                <AppIcon icon={Upload} color='#fff' />
              </IconButton>
            </Box>
            <Box
              marginLeft={3}
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                },
              }}>
              <Typography variant='h5' fontWeight={700}>
                {currentUser?.fullName}
              </Typography>
              <Typography>0 Followers</Typography>
            </Box>
          </Box>
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='center' paddingY={2}>
            <AppInfoWidget icon={Diversity1} title='Followers' iconColor='#44ff00' value={2} />
            <AppInfoWidget icon={AddReaction} title='Reactions' iconColor='#fbe44b' value={2} />
            <AppInfoWidget icon={Comment} title='Comments' value={profileDetail?.commentCount} />
            <AppInfoWidget icon={Bookmark} title='Bookmarks' iconColor='#0288d1' value={5} />
          </Stack>
        </Box>
        <Box
          sx={{
            backgroundColor: '#f2f5f8',
            padding: '16px',
            borderRadius: '8px',
          }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={4}>
              <Box marginBottom={2}>
                <ProfileItem label='Account'>
                  <Stack>
                    <AppProfileInfo icon={AccountCircle} label='Username' value={profileDetail?.username} />
                    <AppProfileInfo
                      icon={Password}
                      label='Password'
                      value='*******'
                      isEdit
                      onEdit={() => showUpdateModal(ProfilePropertiesEnum.Password, 'Password')}
                    />
                  </Stack>
                </ProfileItem>
              </Box>
              <Box marginBottom={2}>
                <ProfileItem label='Personal Information'>
                  <AppProfileInfo
                    icon={Info}
                    label='First name'
                    value={profileDetail?.firstName}
                    isEdit
                    onEdit={() => showUpdateModal(ProfilePropertiesEnum.FirstName, 'First Name')}
                  />
                  <AppProfileInfo
                    icon={Info}
                    label='Last name'
                    value={profileDetail?.lastName}
                    isEdit
                    onEdit={() => showUpdateModal(ProfilePropertiesEnum.LastName, 'Last Name')}
                  />
                  <AppProfileInfo
                    icon={Email}
                    label='Email'
                    value={profileDetail?.email}
                    isEdit
                    onEdit={() => showUpdateModal(ProfilePropertiesEnum.Email, 'Email')}
                  />
                  <AppProfileInfo
                    icon={Phone}
                    label='Phone'
                    value={profileDetail?.phone}
                    isEdit
                    onEdit={() => showUpdateModal(ProfilePropertiesEnum.Phone, 'Phone')}
                  />
                </ProfileItem>
              </Box>
              <ProfileItem label='Additional Information'>
                <AppProfileInfo
                  icon={InsertLink}
                  label='Bio'
                  value={profileDetail?.bio}
                  isEdit
                  isLink
                  onEdit={() => showUpdateModal(ProfilePropertiesEnum.Bio, 'Bio Link')}
                />
              </ProfileItem>
            </Grid>
            <Grid item xs={12} sm={12} md={8} flexWrap='wrap' position='relative'>
              <Box
                sx={{
                  backgroundColor: '#fff',
                  position: 'sticky',
                  top: 0,
                }}
                marginBottom={2}>
                <TextField
                  fullWidth
                  placeholder='Search by title...'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <AppIcon icon={Search} />
                      </InputAdornment>
                    ),
                  }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Box>
              {displayPosts.length ? (
                <Box
                  sx={{
                    maxHeight: '1200px',
                    overflowY: 'scroll',
                  }}
                  paddingX={2}>
                  {displayPosts?.map((post) => (
                    <MyPost
                      key={post.id}
                      tags={post.tags}
                      postId={post.id}
                      title={post.title}
                      viewCount={post.views}
                      typeOfMedia={post.type}
                      latitude={post.latitude}
                      location={post.location}
                      createdAt={post.createdAt}
                      longitude={post.longitude}
                      shortTitle={post.shortTitle}
                      categories={post.categories}
                      description={post.description}
                      commentCount={post.commentCount}
                      fullName={currentUser?.fullName}
                      bookmarkCount={post.bookmarkCount}
                      reactionCount={post.reactionCount}
                      mediaUrl={post.type.includes('image') ? post.imageUrl : post.videoYtbUrl}
                      onDeletePost={() => deletePost(post.id)}
                      avatarUrl={currentUser?.profilePhotoUrl}
                    />
                  ))}
                </Box>
              ) : (
                <>
                  <Stack alignItems='center' justifyContent='center' spacing={2}>
                    <Stack alignItems='center' justifyContent='center' height='400px' width='100%'>
                      <img src={NoDataFoundImage} alt='No data found' />
                    </Stack>
                    <Button
                      variant='contained'
                      onClick={() => navigate('/create-new-post')}
                      startIcon={<AppIcon icon={Add} color='#fff' />}>
                      Create new post
                    </Button>
                  </Stack>
                </>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <UpdateProfileModal isOpen={isOpenUpdateModal} field={field} fieldName={fieldName} onCancel={hideUpdateModal} />
    </>
  );
};

export default ProfileDashBoard;
