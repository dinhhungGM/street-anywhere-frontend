import { Bookmark, Delete, Edit } from '@mui/icons-material';
import { Avatar, Box, Button, MenuItem, Paper, Stack, Tooltip, Typography } from '@mui/material';
import cx from 'classnames';
import { memo, useCallback, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch } from '../../../app/hooks';
import { profileActions } from '../../../features/profile-dashboard/index';
import { IPost } from '../../models/postModels';
import { AppIcon } from '../app-icon';
import { AppIconButton } from '../app-icon-button';
import { AppInnerLoading } from '../app-inner-loading';
import { AppMoreMenu } from '../app-more-menu';
import styles from './styles.module.scss';

interface IAppCardV2Props {
  post?: IPost;
  currentUserId?: number;
  isFixedSize?: boolean;
  isCreator?: boolean;
  onBookmark?: (e) => any;
  onFollow?: (e) => any;
}
const AppCardV2 = ({
  post,
  currentUserId,
  isFixedSize = false,
  isCreator = false,
  onBookmark = (post = null) => {
    return null;
  },
  onFollow = (post = null) => {
    return null;
  },
}: IAppCardV2Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpenMoreMenu, setIsOpenMoreMenu] = useState(false);

  const navigateToPostDetail = (postId: number): void => {
    navigate(`/posts/${ postId }`, { replace: true });
  };

  const handleOnClickBookmark = (e): void => {
    e.stopPropagation();
    onBookmark(post);
  };

  const handleOnClickFollow = (e): void => {
    e.stopPropagation();
    onFollow(post);
  };

  const viewProfile = (e): void => {
    e.stopPropagation();
    navigate(`/profile/${ post?.userId }`);
  };

  const handleEdit = (e): void => {
    e.stopPropagation();
    handleCloseMoreMenu(e);
    navigate(`/profile/${ currentUserId }/update-post/${ post?.id }`);
  };

  const handleDelete = (e): void => {
    e.stopPropagation();
    handleCloseMoreMenu(e);
    SweetAlert.fire({
      title: 'Confirm',
      icon: 'question',
      text: 'Are you sure to remove this post?',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(profileActions.deletePostById(post?.id));
      }
    });
  };

  const handleOpenMoreMenu = useCallback((e) => {
    e.stopPropagation();
    setIsOpenMoreMenu(true);
  }, []);

  const handleCloseMoreMenu = useCallback((e) => {
    e.stopPropagation();
    setIsOpenMoreMenu(false);
  }, []);

  return (
    <>
      <Box
        component={Paper}
        className={cx(styles.card, isFixedSize && styles.card__fixed)}
        elevation={2}>
        <Box className={styles.card__media}>
          {post?.type === 'video' ? (
            <ReactPlayer
              light
              controls={false}
              url={post?.videoYtbUrl}
              fallback={<AppInnerLoading isShowLoading={true} />}
            />
          ) : (
            <img src={post?.imageUrl} alt={post?.shortTitle} className='lazy' />
          )}
        </Box>
        <Box className={styles.card__overlay} onClick={() => navigateToPostDetail(post?.id)}>
          <Stack alignItems='center' height='100%' position='relative'>
            <Stack
              direction='row'
              spacing={1}
              className={styles.card__overlay__actions}
              alignItems='center'>
              <AppIconButton
                tooltip='Bookmark'
                icon={<AppIcon icon={Bookmark} color={post?.isBookmarked ? '#fff' : '#0288d1'} />}
                buttonColor='info'
                customBackgroundColor={post?.isBookmarked ? '#0288d1' : '#fff'}
                buttonSize='large'
                onClick={handleOnClickBookmark}
              />
              {isCreator && (
                <AppMoreMenu
                  bgColor='#fff'
                  btnSize='large'
                  isOpenMenu={isOpenMoreMenu}
                  onOpen={handleOpenMoreMenu}
                  onClose={handleCloseMoreMenu}>
                  <MenuItem onClick={handleEdit}>
                    <AppIconButton tooltip='Edit' icon={<AppIcon icon={Edit} color='#44ff00' />} />
                    <Typography>Edit</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleDelete}>
                    <AppIconButton
                      tooltip='Delete'
                      icon={<AppIcon icon={Delete} color='#e60023' />}
                    />
                    <Typography>Delete</Typography>
                  </MenuItem>
                </AppMoreMenu>
              )}
            </Stack>
            <Typography className={styles.card__overlay__title}>{post?.shortTitle}</Typography>
            <Box padding={2} className={styles.card__overlay__user}>
              <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Tooltip title='View profile'>
                    <Avatar src={post?.profilePhotoUrl} onClick={viewProfile} />
                  </Tooltip>
                  <Tooltip title='View profile'>
                    <Typography
                      fontWeight={700}
                      className={styles.card__overlay__user__name}
                      onClick={viewProfile}>
                      {post?.fullName}
                    </Typography>
                  </Tooltip>
                </Stack>
                {post?.userId !== currentUserId && (
                  <Box
                    sx={{
                      alignSelf: 'flex-end',
                    }}>
                    <Button
                      variant='contained'
                      color={post?.isFollowingUser ? 'error' : 'primary'}
                      sx={{
                        borderRadius: '100rem',
                      }}
                      onClick={handleOnClickFollow}>
                      {post?.isFollowingUser ? 'Unfollow' : 'Follow'}
                    </Button>
                  </Box>
                )}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default memo(AppCardV2);
