import { Shortcut } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppIcon } from '../../solutions/components/app-icon';
import * as shortAsyncActions from './store/shortsAsyncActions';
import * as shortsSelectors from './store/shortsSelectors';
import styles from './styles.module.scss';

const Shorts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const shorts = useAppSelector(shortsSelectors.selectShorts);

  useEffect(() => {
    dispatch(shortAsyncActions.getShorts());
  }, []);

  const goToPostDetail = (postId: number): void => {
    navigate(`/posts/${ postId }`);
  };

  return (
    <>
      <Box className={styles.shorts}>
        <Container className={styles.shorts__container}>
          <Stack
            alignItems='center'
            justifyContent='center'
            sx={{ backgroundColor: '#fff' }}
            padding={2}
            width='fit-content'
            borderRadius={2}>
            {shorts?.map((post) => (
              <Box key={post?.id} className={styles.shorts__card}>
                <Box className={styles.shorts__card__header}>
                  <Stack direction='row' alignItems='center' justifyContent='space-between'>
                    <Stack direction='row' alignItems='center' spacing={2}>
                      <Avatar
                        src={post?.profilePhotoUrl}
                        onClick={() => navigate(`/profile/${ post?.userId }`)}
                        sx={{ cursor: 'pointer' }}
                      />
                      <Stack
                        alignItems='flex-start'
                        justifyContent='flex-start'
                        onClick={() => navigate(`/profile/${ post?.userId }`)}
                        sx={{ cursor: 'pointer' }}>
                        <Typography fontWeight={600}>{post?.fullName}</Typography>
                        <Typography fontSize={12}>{post?.createdAt}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Box>
                <Box className={styles.shorts__card__body}>
                  <Typography variant='h5' marginY={2}>
                    {post?.title}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item md={12}>
                      <ReactPlayer url={post?.videoYtbUrl} width='100%' height='440px' />
                    </Grid>
                    <Grid item md={12}>
                      <Stack
                        direction='row'
                        alignItems='center'
                        justifyContent='space-between'
                        spacing={2}>
                        <Typography>
                          <strong>Views: </strong> {post?.views}
                        </Typography>
                        <Button
                          variant='contained'
                          color='secondary'
                          startIcon={<AppIcon icon={Shortcut} color='#fff' />}
                          onClick={() => goToPostDetail(post?.id)}>
                          View more
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default React.memo(Shorts);
