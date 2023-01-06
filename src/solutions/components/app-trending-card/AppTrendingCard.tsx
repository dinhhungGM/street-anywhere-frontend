import { Bookmark, Shortcut, Visibility } from '@mui/icons-material';
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
import { memo } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch } from '../../../app/hooks';
import { bookmarkActions } from '../../../features/bookmark';
import { userActions } from '../../../features/user';
import { wrapperActions } from '../../../features/wrapper/store';
import { AppIcon } from '../app-icon';
import LikeSrc from './../../assets/images/reactions/like.png';
import LoveSrc from './../../assets/images/reactions/love.png';
import styles from './styles.module.scss';

const showWarning = () =>
  SweetAlert.fire({
    title: 'Warning',
    icon: 'info',
    text: 'You are not sign in. Please login to continue',
    confirmButtonText: 'Sign in',
    showCancelButton: true,
  });

interface IAppTrendingCardProps {
  type?: string;
  title?: string;
  views?: number;
  userId?: number;
  postId?: number;
  createdAt: string;
  fullName?: string;
  imageUrl?: string;
  bookmarkDetail?: any;
  videoYtbUrl?: string;
  isBookmarked?: boolean;
  currentUserId?: number;
  followingDetail?: any;
  totalReaction?: number;
  profilePhotoUrl?: string;
  isFollowingUser?: boolean;
}
const AppTrendingCard = ({
  fullName,
  type,
  title,
  views,
  userId,
  postId,
  imageUrl,
  createdAt,
  videoYtbUrl,
  isBookmarked,
  totalReaction,
  currentUserId,
  bookmarkDetail,
  profilePhotoUrl,
  isFollowingUser,
  followingDetail,
}: IAppTrendingCardProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
            <Stack direction='row'>
              <Stack direction='row' width='50%' spacing={2} alignItems='center'>
                <AppIcon icon={Visibility} />
                <Typography fontWeight={600}>{views} views</Typography>
              </Stack>
              <Stack direction='row' width='50%' spacing={2} alignItems='center'>
                <Stack direction='row' spacing={1}>
                  <Avatar src={LikeSrc} sx={{ width: 24, height: 24 }} />
                  <Avatar src={LoveSrc} sx={{ width: 24, height: 24 }} />
                </Stack>
                <Typography fontWeight={600}>{totalReaction}</Typography>
              </Stack>
            </Stack>
          </Box>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            marginTop={2}
            spacing={2}
            className={styles.actions}
            >
            <Button
              fullWidth
              startIcon={<AppIcon icon={Shortcut} color='#fff' />}
              variant='contained'
              color='success'
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
    </>
  );
};

export default memo(AppTrendingCard);
