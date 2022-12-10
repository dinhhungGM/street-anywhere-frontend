import { AddReaction, Bookmark } from '@mui/icons-material';
import { Avatar, Box, Button, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { memo } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../../models/postModels';
import { AppIcon } from '../app-icon';
import { AppIconButton } from '../app-icon-button';
import { AppInnerLoading } from '../app-inner-loading';
import styles from './styles.module.scss';
import cx from 'classnames';

interface IAppCardV2Props {
  post?: IPost;
  currentUserId?: number;
  isFixedSize?: boolean;
  onReact?: (e) => any;
  onBookmark?: (e) => any;
  onFollow?: (e) => any;
  onViewProfile?: (e) => any;
}
const AppCardV2 = ({
  post,
  currentUserId,
  isFixedSize = false,
  onReact = (e) => {
    e.stopPropagation();
    return null;
  },
  onBookmark = (post = null) => {
    return null;
  },
  onFollow = (post = null) => {
    return null;
  },
  onViewProfile = (e) => {
    return null;
  },
}: IAppCardV2Props) => {
  const navigate = useNavigate();

  const navigateToPostDetail = (postId: number): void => {
    navigate(`/posts/${ postId }`);
  };

  const handleOnClickAddReaction = (e): void => {
    e.stopPropagation();
    onReact(post);
  };

  const handleOnClickBookmark = (e): void => {
    e.stopPropagation();
    onBookmark(post);
  };

  const handleOnClickFollow = (e): void => {
    e.stopPropagation(e);
    onFollow(post);
  };

  return (
    <>
      <Box component={Paper} className={cx(styles.card, isFixedSize && styles.card__fixed)} elevation={2}>
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
            <Stack direction='row' spacing={1} className={styles.card__overlay__actions}>
              <AppIconButton
                tooltip='Bookmark'
                icon={<AppIcon icon={Bookmark} color={post.isBookmarked ? '#fff' : '#0288d1'} />}
                buttonColor='info'
                customBackgroundColor={post.isBookmarked ? '#0288d1' : '#fff'}
                buttonSize='large'
                onClick={handleOnClickBookmark}
              />
              <AppIconButton
                tooltip='Add Reactions'
                icon={<AppIcon icon={AddReaction} color='#fbe44b' />}
                buttonColor='warning'
                customBackgroundColor='#fff'
                buttonSize='large'
                onClick={handleOnClickAddReaction}
              />
            </Stack>
            <Box padding={2} className={styles.card__overlay__user}>
              <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Tooltip title='View profile'>
                    <Avatar src={post?.profilePhotoUrl} onClick={onViewProfile} />
                  </Tooltip>
                  <Tooltip title='View profile'>
                    <Typography fontWeight={700} className={styles.card__overlay__user__name}>
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
