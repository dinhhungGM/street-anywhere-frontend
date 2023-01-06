import { Bookmark, Directions, Room, Shortcut } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import { memo, useCallback, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch } from '../../../app/hooks';
import { bookmarkActions } from '../../../features/bookmark';
import { userActions } from '../../../features/user';
import { wrapperActions } from '../../../features/wrapper/store';
import { AppIcon } from '../app-icon';
import { AppMapBox } from '../app-mapbox';
import { AppModal } from '../app-modal';
import styles from './styles.module.scss';

const showWarning = () =>
  SweetAlert.fire({
    title: 'Warning',
    icon: 'info',
    text: 'You are not sign in. Please sign to continue',
    confirmButtonText: 'Sign in',
    showCancelButton: true,
  });

interface IAppExploreCardProps {
  type?: string;
  title?: string;
  views?: number;
  userId?: number;
  postId?: number;
  userLat?: number;
  postLat?: number;
  postLong?: number;
  userLong?: number;
  address?: string;
  createdAt: string;
  fullName?: string;
  imageUrl?: string;
  distance?: number;
  bookmarkDetail?: any;
  videoYtbUrl?: string;
  isBookmarked?: boolean;
  currentUserId?: number;
  followingDetail?: any;
  profilePhotoUrl?: string;
  isFollowingUser?: boolean;
}
const AppExploreCard = ({
  fullName,
  type,
  title,
  userId,
  postId,
  address,
  userLat,
  postLat,
  userLong,
  postLong,
  imageUrl,
  distance,
  createdAt,
  videoYtbUrl,
  isBookmarked,
  currentUserId,
  bookmarkDetail,
  profilePhotoUrl,
  isFollowingUser,
  followingDetail,
}: IAppExploreCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpenMap, setIsOpenMap] = useState(false);

  //  Handling bookmark
  const handleBookmarkPost = () => {
    if (_.isNil(currentUserId)) {
      showWarning().then((result) => {
        if (result.isConfirmed) {
          navigate('/sign-in');
        }
      });
    } else {
      if (isBookmarked) {
        dispatch(bookmarkActions.unBookmark({ bookmarkId: bookmarkDetail.bookmarkId }));
      } else {
        dispatch(
          bookmarkActions.createBookmark({
            postId: postId,
            userId: currentUserId,
          }),
        );
        if (currentUserId !== +userId) {
          dispatch(
            wrapperActions.createNewNotification({
              postId: postId,
              type: 'bookmarked',
              reactionType: null,
              userId: currentUserId,
            }),
          );
        }
      }
    }
  };

  // Handling follow user
  const handleFollowUser = () => {
    if (!currentUserId) {
      showWarning().then((rs) => {
        if (rs.isConfirmed) {
          navigate('/sign-in');
        }
      });
    } else {
      if (isFollowingUser) {
        dispatch(
          userActions.unfollowUser({
            userId: followingDetail?.userId,
            followerId: followingDetail?.followerId,
          }),
        );
      } else {
        dispatch(userActions.followUser({ userId: currentUserId, followerId: userId }));
        if (currentUserId !== userId) {
          dispatch(
            wrapperActions.createNewNotification({
              postId,
              userId: currentUserId,
              type: 'followed',
              reactionType: null,
            }),
          );
        }
      }
    }
  };

  // Handle close map
  const handleCloseMap = useCallback(() => {
    setIsOpenMap(false);
  }, []);

  return (
    <>
      <Card className='card'>
        <CardHeader
          title={fullName}
          subheader={createdAt}
          sx={{ cursor: 'pointer' }}
          onClick={() => navigate(`/profile/${userId}`)}
          avatar={<Avatar src={profilePhotoUrl}>{fullName[0]}</Avatar>}
          action={
            currentUserId !== userId ? (
              <Button
                variant='contained'
                color={isFollowingUser ? 'error' : 'primary'}
                onClick={(e) => {
                  e.stopPropagation();
                  handleFollowUser();
                }}>
                {isFollowingUser ? 'Unfollow' : 'Follow'}
              </Button>
            ) : null
          }
        />
        <CardActionArea onClick={() => navigate(`/posts/${postId}`)}>
          {type === 'video' ? (
            <>
              <Box marginY={1}>
                <ReactPlayer
                  light
                  muted
                  width='100%'
                  height='285px'
                  controls={false}
                  url={videoYtbUrl}
                />
              </Box>
            </>
          ) : (
            <>
              <CardMedia component='img' height='300' image={imageUrl} alt='Image' sx={{ px: 1 }} />
            </>
          )}
        </CardActionArea>
        <CardContent sx={{ paddingBottom: '16px !important' }}>
          <Typography variant='h6' className={styles.title}>
            {title}
          </Typography>
          <Box marginY={1}>
            <Stack direction='row' alignItems='center' spacing={1}>
              <AppIcon icon={Room} color='#e60023' />
              <Typography
                width='100%'
                whiteSpace='nowrap'
                textOverflow='ellipsis'
                overflow='hidden'>
                {address}
              </Typography>
            </Stack>
            <Typography>
              <strong>Distance: </strong>
              {distance} km
            </Typography>
          </Box>
          <Box marginY={1}>
            <Button
              fullWidth
              variant='contained'
              color='success'
              startIcon={<AppIcon icon={Directions} color='#fff' />}
              onClick={() => setIsOpenMap(true)}>
              View direction
            </Button>
          </Box>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            marginTop={2}
            spacing={2}
            className={styles.actions}>
            <Button
              fullWidth
              startIcon={<AppIcon icon={Shortcut} color='#fff' />}
              variant='contained'
              color='primary'
              onClick={() => navigate(`/posts/${postId}`)}>
              View more
            </Button>
            <Button
              fullWidth
              startIcon={<AppIcon icon={Bookmark} color={isBookmarked ? '#fff' : '#0288d1'} />}
              variant={isBookmarked ? 'contained' : 'outlined'}
              color={isBookmarked ? 'error' : 'primary'}
              onClick={handleBookmarkPost}
              className={styles['btn-bookmark']}>
              {isBookmarked ? 'Unbookmark' : 'Bookmark'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <AppModal
        title='Map'
        width='60vw'
        height='60vh !important'
        isOpen={isOpenMap}
        cancelText='Close'
        isDisplayOkButton={false}
        onClose={handleCloseMap}
        onCancel={handleCloseMap}>
        <AppMapBox
          isTracing
          address={address}
          isDisplayGeoDirection
          sourcePoint={{ lat: userLat, long: userLong }}
          desPoint={{ lat: postLat, long: postLong }}
        />
      </AppModal>
    </>
  );
};

export default memo(AppExploreCard);
