import { Bookmark, Category, Description, Map, Room, Tag } from '@mui/icons-material';
import { Avatar, Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import randomColor from 'randomcolor';
import { memo, useCallback, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppCardV2 } from '../../../solutions/components/app-card-v2';
import { AppCarousel } from '../../../solutions/components/app-carousel';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppListChips } from '../../../solutions/components/app-list-chips';
import { AppMapBox } from '../../../solutions/components/app-mapbox';
import { AppModal } from '../../../solutions/components/app-modal';
import { AppReactions } from '../../../solutions/components/app-reactions';
import { authSelectors } from '../../auth/store';
import { postActions, postSelectors } from '../store';
import { PostComments } from './components/post-comments';
import styles from './styles.module.scss';

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(postSelectors.selectSelectedPost);
  const relevantPosts = useAppSelector(postSelectors.selectRelevantPost);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false);
  const [currentCoord, setCurrentCoord] = useState<{ long: number; lat: number; } | null>(null);

  const showMap = (): void => {
    setIsOpenMap(true);
  };

  const hideMap = useCallback((): void => {
    setIsOpenMap(false);
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentCoord({ long: position.coords.longitude, lat: position.coords.latitude });
    });
    dispatch(postActions.getPostByIdAsync(+postId));
    return () => {
      dispatch(postActions.resetPostDetail());
    };
  }, []);

  useEffect(() => {
    if (post) {
      dispatch(
        postActions.getPostRelevantToCurrentPost({
          categories: post?.categories,
          hashtags: post?.tags,
          postId: post?.id,
        }),
      );
    }
  }, [post]);

  return (
    <>
      <Box className={styles.post__details}>
        <Typography variant='h2' textAlign='center' fontWeight={700}>
          {post?.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6} padding={4}>
            <Box className={styles.post__details__media}>
              <Stack width='100%' spacing={2}>
                <Box className={styles.post__details__media__content}>
                  {post?.type === 'video' ? (
                    <ReactPlayer url={post?.videoYtbUrl} width='100%' height='100%' />
                  ) : (
                    <img src={post?.imageUrl} alt={post?.title} />
                  )}
                </Box>
                <Box className={styles.post__details__reactions}>
                  <AppReactions boxShadowSize={2} />
                  <Button className={styles.post__details__reactions__btn} color='primary' variant='outlined'>
                    <AppIcon icon={Bookmark} />
                    <Typography marginLeft={1}>Save</Typography>
                  </Button>
                  <Button
                    className={styles.post__details__reactions__btn}
                    color='success'
                    variant='contained'
                    onClick={showMap}>
                    <AppIcon icon={Map} color='#fff' />
                    <Typography marginLeft={1}>View on map</Typography>
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box className={styles.post__details__user}>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                padding={4}
                className={styles.post__details__user__background}>
                <Stack direction='row' alignItems='center' spacing={3}>
                  <Avatar src={post?.profilePhotoUrl} />
                  <Box>
                    <Typography fontWeight={700}>{post?.fullName}</Typography>
                    <Typography fontSize={12} fontStyle='italic'>
                      {new Date(post?.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
                {currentUser?.id !== post?.userId && <Button variant='contained'>Follow</Button>}
              </Stack>
              <Stack spacing={1}>
                <AppListChips data={post?.tags} icon={Tag} title='Tags' iconColor='#84849d' />
                <AppListChips data={post?.categories} icon={Category} title='Categories' iconColor='#ff5b00' />
              </Stack>
              {post?.location && (
                <Stack direction='row' alignItems='center' justifyContent='flex-start' spacing={1} marginTop={1}>
                  <AppIcon icon={Room} color='#e60023' />
                  <Typography fontWeight={700}>Address:</Typography>
                  <Typography fontStyle='italic'>{post?.location}</Typography>
                </Stack>
              )}
              <Stack direction='row' alignItems='center' spacing={1} marginTop={1}>
                <AppIcon icon={Description} />
                <Typography fontWeight={700}>Description:</Typography>
              </Stack>
              <Typography marginTop={1} textAlign='justify' className={styles.post__details__user__description}>
                {post?.description || `(No description)`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box className={styles.post__details__comment}>
          <PostComments currentUserId={currentUser?.id} ownerId={post?.userId} postId={post?.id} key={post?.id} />
        </Box>
        <Box className={styles.post__details__relevant}>
          <Typography textAlign='center' fontSize={28} fontWeight={700} marginY={2}>
            More like this
          </Typography>
          {relevantPosts && relevantPosts.length && (
            <AppCarousel>
              {relevantPosts.map((post) => (
                <AppCardV2 key={post?.id} post={post} />
              ))}
            </AppCarousel>
          )}
        </Box>
      </Box>
      <AppModal
        isOpen={isOpenMap}
        onCancel={hideMap}
        onClose={hideMap}
        isDisplayCancelButton={false}
        isDisplayOkButton
        title='Map'
        width='90vw'>
        <AppMapBox
          address={post?.location}
          isTracing
          isDisplayGeoDirection
          sourcePoint={{ long: currentCoord?.long, lat: currentCoord?.lat }}
          desPoint={{ long: post?.longitude, lat: post?.latitude }}
        />
      </AppModal>
    </>
  );
};

export default memo(PostDetail);
