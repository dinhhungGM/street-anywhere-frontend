import { ArrowBack, Comment } from '@mui/icons-material';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppMapBox } from '../../../solutions/components/app-mapbox';
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
  const [currentCoord, setCurrentCoord] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentCoord({ long: position.coords.longitude, lat: position.coords.latitude });
    });
    const { postId } = params;
    dispatch(postActions.incrementViewAsync(+postId));
    dispatch(postActions.getPostByIdAsync(+postId));

    return () => {
      dispatch(postActions.resetPostDetail());
    };
  }, []);

  return (
    <>
      <Container className={styles['post-detail']}>
        <Button startIcon={<AppIcon icon={ArrowBack} color='#fff' />} onClick={() => navigate('/')} variant='contained'>
          Home
        </Button>
        <PostOwnerProfile
          userId={selectedPost?.userId}
          avatarUrl={selectedPost?.user?.profilePhotoUrl}
          fullName={selectedPost?.user?.fullName}
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
              <PostReactions currentUserId={currentUser?.id} postId={selectedPost?.id} ownerId={selectedPost?.userId} />
            </Grid>
            <Grid item sm={12} md={6}>
              <Button
                fullWidth
                size='large'
                variant='contained'
                startIcon={<AppIcon icon={Comment} color='#fff' />}
                onClick={() => setIsOpenComment(!isOpenComment)}>
                Comment
              </Button>
            </Grid>
            <Grid item sm={12} md={3}>
              <PostBookmark currentUserId={currentUser?.id} postId={selectedPost?.id} ownerId={selectedPost?.userId} />
            </Grid>
          </Grid>
        </Box>
        {isOpenComment && <PostComments postId={selectedPost?.id} currentUserId={currentUser?.id} ownerId={selectedPost?.userId} />}
        <PostDetailTable
          location={selectedPost?.location}
          longitude={selectedPost?.longitude}
          latitude={selectedPost?.latitude}
        />
        {utils.isExistLatAndLong(selectedPost) && currentCoord ? (
          <Box className={styles['post-detail__map']} width='100%'>
            <AppMapBox
              isTracing
              isDisplayGeoDirection
              mapHeight='600px'
              address={selectedPost?.location}
              desPoint={{ long: selectedPost?.longitude, lat: selectedPost?.latitude }}
              sourcePoint={{ long: currentCoord?.long, lat: currentCoord?.lat }}
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
