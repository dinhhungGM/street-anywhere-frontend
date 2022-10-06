import { ArrowBack, Bookmark } from '@mui/icons-material';
import { Box, Button, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppMap } from '../../../solutions/components/app-map';
import { LoadingSpinner } from '../../../solutions/components/loading-spinner';
import { authSelectors } from '../../auth/store';
import { PostBookmark } from '../post-bookmark';
import { PostDetailTable } from '../post-detail-table';
import { PostOwnerProfile } from '../post-owner-profile';
import { PostReactions } from '../post-reactions';
import { postActions, postSelectors } from '../store';
import styles from './styles.module.scss';
import * as utils from './utils';

const PostDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(postSelectors.selectSelectedPost);
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

  const savePostToBookmark = async () => {
    if (!currentUser) {
      navigate('/sign-in');
    }
    dispatch(
      postActions.savePostToBookmark({
        postId: selectedPost.id,
        userId: currentUser.id,
      }),
    );
  };

  useEffect(() => {
    const { postId } = params;
    dispatch(postActions.incrementViewAsync(+postId));
    dispatch(postActions.getPostByIdAsync(+postId));
  }, []);

  return (
    <>
      <Container className={styles['post-detail']}>
        <Button startIcon={<AppIcon component={ArrowBack} />} onClick={() => navigate('/')}>
          Home
        </Button>
        <PostOwnerProfile
          userId={currentUser.id}
          avatarUrl={currentUser.profilePhotoUrl}
          fullName={currentUser.fullName}
        />
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
        <Stack justifyContent='center' alignItems='center'>
          <Box width='50%'>
            <Grid container>
              <Grid item sm={12} md={6}>
                <PostReactions currentUserId={currentUser?.id} postId={selectedPost?.id} />
              </Grid>
              <Grid item sm={12} md={6}>
                <PostBookmark />
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <PostDetailTable
          location={selectedPost?.location}
          longitude={selectedPost?.longitude}
          latitude={selectedPost?.latitude}
        />
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
