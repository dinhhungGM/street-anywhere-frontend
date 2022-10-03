import { ArrowBack, Bookmark } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppMap } from '../../../solutions/components/app-map';
import { LoadingSpinner } from '../../../solutions/components/loading-spinner';
import AlertUtil from '../../../solutions/utils/alertUtil';
import { authSelectors } from '../../auth/store';
import { postActions, postSelectors } from '../store';
import ICON_CONFIGS from './icon-config';
import styles from './styles.module.scss';
import * as utils from './utils';

const PostDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(postSelectors.selectSelectedPost);
  const reactions = useAppSelector(postSelectors.selectReactions);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const navigate = useNavigate();

  const addReaction = async (reactionId: number) => {
    const response = await dispatch(
      postActions.addReactionAsync({
        reactionId,
        postId: selectedPost.id,
        userId: +currentUser.id,
      }),
    );
    if (response.meta.requestStatus === 'fulfilled') {
      window.location.reload();
    }
  };

  useEffect(() => {
    const { postId } = params;
    dispatch(postActions.incrementViewAsync(+postId));
    dispatch(postActions.getPostByIdAsync(+postId));
    dispatch(postActions.getReactionsAsync());
  }, []);

  return (
    <>
      <Container className={styles['post-detail']}>
        <Button startIcon={<AppIcon component={ArrowBack} />} onClick={() => navigate('/')}>
          Home
        </Button>
        <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between' marginY={2}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <img src={selectedPost?.user.profilePhotoUrl} alt='Avatar User' className={styles['post-detail__avatar']} />
            <Typography>{selectedPost?.user.fullName}</Typography>
          </Stack>
          <Stack alignSelf='flex-end' direction='row' spacing={2}>
            <IconButton size='large'>
              <AppIcon component={Bookmark} />
            </IconButton>
          </Stack>
        </Stack>
        <Typography variant='h2' textAlign='center'>
          {selectedPost?.title}
        </Typography>
        <Box className={styles['post-detail__image']}>
          {selectedPost?.type === 'video' ? (
            <ReactPlayer
              url={selectedPost.videoYtbUrl}
              width='100%'
              height='100%'
              controls={true}
              fallback={<LoadingSpinner />}
            />
          ) : (
            <LazyLoadImage alt={selectedPost?.shortTitle} src={selectedPost?.imageUrl} />
          )}
        </Box>
        <Stack flexDirection='row' alignItems='center' justifyContent='space-between' spacing={1} marginY={3}>
          {reactions?.map((reaction) => (
            <Button key={reaction.id} variant='outlined' onClick={() => addReaction(+reaction.id)}>
              {ICON_CONFIGS[reaction.reactionType.toLowerCase()]}
              <Typography marginLeft={2}>{reaction.reactionType}</Typography>
              {selectedPost.reactions[reaction.reactionType] && (
                <Typography marginLeft={1}>({selectedPost.reactions[reaction.reactionType].count})</Typography>
              )}
            </Button>
          ))}
        </Stack>
        <Typography textAlign='justify' paddingY={3}>
          {selectedPost?.description}
        </Typography>
        <Typography paddingY={2} variant='h5'>
          Location: <span className={styles['post-detail__location']}>{selectedPost?.location}</span>
        </Typography>
        <Typography paddingY={2} variant='h5'>
          Longitude: <span className={styles['post-detail__location']}>{selectedPost?.longitude}</span>
        </Typography>
        <Typography paddingY={2} variant='h5'>
          Latitude: <span className={styles['post-detail__location']}>{selectedPost?.latitude}</span>
        </Typography>
        {utils.isExistLatAndLong(selectedPost) ? (
          <Box className={styles['post-detail__map']}>
            <AppMap
              latitude={selectedPost?.latitude}
              longitude={selectedPost?.longitude}
              marker={{
                latitude: selectedPost?.latitude,
                longitude: selectedPost?.longitude,
              }}
              zoom={15}
              isReadonly={true}
            />
          </Box>
        ) : (
          <>
            <Box className={styles['post-detail__error-map']} boxShadow={1}>
              <img src='/gg-map-error.jpg' alt='Error Map' />
            </Box>
          </>
        )}
        <Box paddingY={2}>{/* <PostComments postId={+selectedPost?.id} /> */}</Box>
      </Container>
    </>
  );
};

export default PostDetail;
