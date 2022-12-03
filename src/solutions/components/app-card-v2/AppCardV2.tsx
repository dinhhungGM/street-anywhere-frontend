import { AddReaction, Bookmark } from '@mui/icons-material';
import { Avatar, Box, Button, Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { IPost } from '../../models/postModels';
import { AppIcon } from '../app-icon';
import { AppIconButton } from '../app-icon-button';
import { AppInnerLoading } from '../app-inner-loading';
import styles from './styles.module.scss';

interface IAppCardV2Props {
  post?: IPost;
}
const AppCardV2 = ({ post }: IAppCardV2Props) => {
  const navigate = useNavigate();

  const navigateToPostDetail = (postId: number): void => {
    navigate(`/posts/${ postId }`);
  };

  return (
    <>
      <Box component={Paper} className={styles.card} elevation={2}>
        <Box className={styles.card__media}>
          {post?.type === 'video' ? (
            <ReactPlayer controls={false} url={post?.videoYtbUrl} fallback={<AppInnerLoading isShowLoading={true} />} />
          ) : (
            <img src={post?.imageUrl} alt={post?.shortTitle} className='lazy' />
          )}
        </Box>
        <Box className={styles.card__overlay} onClick={() => navigateToPostDetail(post?.id)}>
          <Stack
            sx={{
              height: '100%',
            }}
            alignItems='flex-start'
            justifyContent='space-between'>
            <Stack
              spacing={1}
              sx={{
                alignSelf: 'flex-end',
                padding: '8px',
              }}
              className={styles.card__overlay__actions}>
              <AppIconButton
                tooltip='Bookmark'
                icon={<AppIcon icon={Bookmark} color='#0288d1' />}
                buttonColor='info'
                customBackgroundColor='#fff'
              />
              <AppIconButton
                tooltip='Add Reactions'
                icon={<AppIcon icon={AddReaction} color='#fbe44b' />}
                buttonColor='info'
                customBackgroundColor='#fff'
              />
            </Stack>
            <Box padding={2} className={styles.card__overlay__user}>
              <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
                <Stack direction='row' alignItems='center' spacing={2}>
                  <Avatar src={post?.user.profilePhotoUrl} />
                  <Typography fontWeight={700}>{post?.user.fullName}</Typography>
                </Stack>
                <Box
                  sx={{
                    alignSelf: 'flex-end',
                  }}>
                  <Button
                    variant='contained'
                    sx={{
                      borderRadius: '100rem',
                    }}>
                    Follow
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default memo(AppCardV2);
