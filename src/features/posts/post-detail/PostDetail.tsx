import { ArrowBack, Comment } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppMap } from '../../../solutions/components/app-map';
import { LoadingSpinner } from '../../../solutions/components/loading-spinner';
import { authSelectors } from '../../auth/store';
import { postActions, postSelectors } from '../store';
import { PostBookmark } from './components/post-bookmark';
import { PostComments } from './components/post-comments';
import { PostDetailTable } from './components/post-detail-table';
import { PostOwnerProfile } from './components/post-owner-profile';
import { PostReactions } from './components/post-reactions';
import styles from './styles.module.scss';
import * as utils from './utils';

const PostDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(postSelectors.selectSelectedPost);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const navigate = useNavigate();
  const [isOpenComment, setIsOpenComment] = useState(false);

  useEffect(() => {
    const { postId } = params;
    dispatch(postActions.incrementViewAsync(+postId));
    dispatch(postActions.getPostByIdAsync(+postId));
  }, []);

  return (
    <>
      <Container className={styles['post-detail']}>
        <Button startIcon={<AppIcon icon={ArrowBack} />} onClick={() => navigate('/')}>
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
              url={selectedPost?.videoYtbUrl}
              width='100%'
              height='100%'
              controls={true}
              fallback={<LoadingSpinner />}
            />
          ) : (
            <LazyLoadImage alt={selectedPost?.shortTitle} src={selectedPost?.imageUrl} />
          )}
        </Box>
        <Box paddingY={2}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={3}>
              <PostReactions currentUserId={currentUser?.id} postId={selectedPost?.id} />
            </Grid>
            <Grid item sm={12} md={6}>
              <Button
                fullWidth
                size='large'
                variant='contained'
                startIcon={<AppIcon icon={Comment} color='#fff' />}
                onClick={() => setIsOpenComment(!isOpenComment)}
              >
                Comment
              </Button>
            </Grid>
            <Grid item sm={12} md={3}>
              <PostBookmark currentUserId={currentUser?.id} postId={selectedPost?.id} />
            </Grid>
          </Grid>
        </Box>
        {isOpenComment && <PostComments postId={selectedPost?.id} currentUserId={currentUser?.id} />}
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
      </Container>
    </>
  );
};

export default PostDetail;
