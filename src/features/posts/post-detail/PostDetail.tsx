import { FavoriteBorder, Share } from '@mui/icons-material';
import { Box, Button, Container, IconButton, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppMap } from '../../../solutions/components/app-map';
import { postActions, postSelectors } from '../store';
import styles from './styles.module.scss';
import * as utils from './utils';

const PostDetail = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(postSelectors.selectSelectedPost);

  useEffect(() => {
    const { postId } = params;
    dispatch(postActions.getPostByIdAsync(+postId));
  }, []);
  return (
    <>
      <Container className={styles['post-detail']}>
        <Stack direction='row' spacing={2} alignItems='center' justifyContent='space-between' marginY={2}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <img src={selectedPost?.user.profilePhotoUrl} alt='Avatar User' className={styles['post-detail__avatar']} />
            <Typography>{selectedPost?.user.fullName}</Typography>
          </Stack>
          <Stack alignSelf='flex-end' direction='row' spacing={2}>
            <Button startIcon={<AppIcon component={FavoriteBorder} />}>Like</Button>
          </Stack>
        </Stack>
        <Typography variant='h2'>{selectedPost?.title}</Typography>
        <Box className={styles['post-detail__image']}>
          <img src={selectedPost?.imageUrl} alt={selectedPost?.shortTitle} />
        </Box>
        <Typography paddingY={2} variant='h5'>
          Address: {selectedPost?.location}
        </Typography>
        {utils.isExistLatAndLong(selectedPost) ? (
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
        ) : (
          <>Error Map</>
        )}
      </Container>
    </>
  );
};

export default PostDetail;
