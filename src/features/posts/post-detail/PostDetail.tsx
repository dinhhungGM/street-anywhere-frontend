import { ArrowBack, FavoriteBorder } from '@mui/icons-material';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppMap } from '../../../solutions/components/app-map';
import { LoadingSpinner } from '../../../solutions/components/loading-spinner';
import { postActions, postSelectors } from '../store';
import styles from './styles.module.scss';
import * as utils from './utils';

const PostDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(postSelectors.selectSelectedPost);
  const navigate = useNavigate();

  useEffect(() => {
    const { postId } = params;
    dispatch(postActions.getPostByIdAsync(+postId));
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
            <Button startIcon={<AppIcon component={FavoriteBorder} />}>Like</Button>
          </Stack>
        </Stack>
        <Typography variant='h2' textAlign='center'>
          {selectedPost?.title}
        </Typography>
        <Box className={styles['post-detail__image']}>
          {selectedPost.type === 'video' ? (
            <ReactPlayer
              url={selectedPost.videoYtbUrl}
              width='100%'
              height='100%'
              controls={true}
              fallback={<LoadingSpinner />}
            />
          ) : (
            <img src={selectedPost?.imageUrl} alt={selectedPost?.shortTitle} />
          )}
        </Box>
        <Typography textAlign='justify' paddingY={3}>
          {selectedPost?.description}
        </Typography>
        <Typography paddingY={2} variant='h5'>
          Location: <span className={styles['post-detail__location']}>{selectedPost?.location}</span>
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
