import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { postActions, postSelectors } from '../store';
import { Box, Container, IconButton, Stack, Typography } from '@mui/material';
import styles from './styles.module.scss';
import { AppMap } from '../../../solutions/components/app-map';

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
        <Stack direction='row' spacing={2} alignItems='center'>
          <Box>
            <img src={selectedPost?.user.profilePhotoUrl} alt='Avatar User' className={styles['post-detail__avatar']} />
            <Typography>{selectedPost?.user.fullName}</Typography>
          </Box>
          <Box>
            <IconButton></IconButton>
            <IconButton></IconButton>
          </Box>
        </Stack>
        <Typography variant='h2'>{selectedPost?.title}</Typography>
        <Typography>Location</Typography>
        <Typography>Image</Typography>
        <AppMap
          latitude={selectedPost?.latitude}
          longitude={selectedPost?.longitude}
          marker={{
            latitude: selectedPost?.latitude,
            longitude: selectedPost?.longitude,
          }}
          zoom={15}
        />
      </Container>
    </>
  );
};

export default PostDetail;
