import { Bookmark, Map } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, Paper, Stack, Typography, IconButton } from '@mui/material';
import { useEffect, memo } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppIconButton } from '../../../solutions/components/app-icon-button';
import { AppReactions } from '../../../solutions/components/app-reactions';
import { authSelectors } from '../../auth/store';
import { postActions, postSelectors } from '../store';
import { PostComments } from './components/post-comments';
import styles from './styles.module.scss';

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const post = useAppSelector(postSelectors.selectSelectedPost);
  const relevantPost = useAppSelector(postSelectors.selectRelevantPost);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);

  useEffect(() => {
    dispatch(postActions.getPostByIdAsync(+postId));
    dispatch(
      postActions.getPostRelevantToCurrentPost({
        categories: post?.categories,
        hashtags: post?.tags,
        postId: post?.id,
      }),
    );
    return () => {
      dispatch(postActions.resetPostDetail());
    };
  }, []);

  return (
    <>
      <Box className={styles.post__details}>
        <Typography variant='h2' textAlign='center' fontWeight={700}>
          {post?.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Box className={styles.post__details__media}>
              <Stack width='100%' spacing={2}>
                <Box className={styles.post__details__media__content} component={Paper} elevation={3}>
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
                  <Button className={styles.post__details__reactions__btn} color='success' variant='contained'>
                    <AppIcon icon={Map} color='#fff' />
                    <Typography marginLeft={1}>View on map</Typography>
                  </Button>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6} padding={4}>
            <Box className={styles.post__details__user}>
              <Stack direction='row' alignItems='center' justifyContent='space-between' padding={4}>
                <Stack direction='row' alignItems='center' spacing={3}>
                  <Avatar src={post?.profilePhotoUrl} />
                  <Box>
                    <Typography fontWeight={600}>{post?.fullName}</Typography>
                    <Typography>{new Date(post?.createdAt).toLocaleString()}</Typography>
                  </Box>
                </Stack>
                {currentUser?.id !== post?.userId && <Button variant='contained'>Follow</Button>}
              </Stack>
              <Typography marginBottom={4} textAlign='justify' className={styles.post__details__user__description}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae necessitatibus distinctio deleniti,
                quasi numquam quibusdam tempora et voluptates, nam labore quis nemo reprehenderit fugit nulla, ducimus
                laudantium ullam beatae fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
                necessitatibus distinctio deleniti, quasi numquam quibusdam tempora et voluptates, nam labore quis nemo
                reprehenderit fugit nulla, ducimus laudantium ullam beatae fugiat. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Molestiae necessitatibus distinctio deleniti, quasi numquam quibusdam
                tempora et voluptates, nam labore quis nemo reprehenderit fugit nulla, ducimus laudantium ullam beatae
                fugiat. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae necessitatibus distinctio
                deleniti, quasi numquam quibusdam tempora et voluptates, nam labore quis nemo reprehenderit fugit nulla,
                ducimus laudantium ullam beatae fugiat.
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box className={styles.post__details__comment}>
          <PostComments currentUserId={currentUser?.id} ownerId={post?.userId} postId={post?.id} key={post?.id} />
        </Box>
      </Box>
    </>
  );
};

export default memo(PostDetail);
