import { Bookmark, Shortcut } from '@mui/icons-material';
import { Avatar, Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useEffect, useMemo } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { shortsActions } from '.';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppIcon } from '../../solutions/components/app-icon';
import { authSelectors } from '../auth/store';
import { bookmarkActions } from '../bookmark';
import { wrapperActions } from '../wrapper/store';
import { userActions, userSelectors } from './../user';
import * as shortsSelectors from './store/shortsSelectors';
import styles from './styles.module.scss';

const showWarning = () =>
  SweetAlert.fire({
    title: 'Warning',
    icon: 'info',
    text: 'You are not logged in. Please login to continue',
    confirmButtonText: 'Sign in',
    showCancelButton: true,
  });

const Shorts = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const shorts = useAppSelector(shortsSelectors.selectShorts);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const followingUsers = useAppSelector(userSelectors.selectedFollowingUsers);
  const bookmarkedPosts = useAppSelector(userSelectors.selectBookmarkedPosts);

  // Loading shorts
  useEffect(() => {
    dispatch(shortsActions.getShorts());
    if (currentUser) {
      dispatch(userActions.getBookmarkedPost(currentUser?.id));
      dispatch(userActions.getFollowingUsers(currentUser?.id));
    }
    return () => {
      dispatch(shortsActions.resetShorts());
      dispatch(userActions.resetAllData());
    };
  }, []);

  // Constructing posts
  const displayShorts = useMemo(() => {
    if (!currentUser) {
      return shorts;
    }
    return _.map(shorts, (item) => {
      const bookmarkedPost = _.find(bookmarkedPosts, (i) => i.postId === item?.id);
      const followingUser = _.find(followingUsers, (i) => i.followerId === item?.userId);
      return {
        ...item,
        isBookmarked: !!bookmarkedPost,
        bookmarkedDetail: bookmarkedPost,
        isFollowingUser: !!followingUser,
        followingDetail: followingUser,
      };
    });
  }, [shorts, bookmarkedPosts, followingUsers]);

  // Handling go to post details
  const goToPostDetail = (postId: number): void => {
    navigate(`/posts/${postId}`);
  };

  // Handling follow user
  const handleFollowUser = (post) => {
    if (!currentUser) {
      showWarning().then((rs) => {
        if (rs.isConfirmed) {
          navigate('/sign-in');
        }
      });
    } else {
      if (post.isFollowingUser) {
        dispatch(
          userActions.unfollowUser({
            userId: post?.followingDetail?.userId,
            followerId: post?.followingDetail?.followerId,
          }),
        );
      } else {
        dispatch(userActions.followUser({ userId: currentUser?.id, followerId: post?.userId }));
        if (currentUser?.id !== post?.userId) {
          dispatch(
            wrapperActions.createNewNotification({
              postId: post?.id,
              userId: currentUser?.id,
              type: 'followed',
              reactionType: null,
            }),
          );
        }
      }
    }
  };

  // handleBookmarkPost
  const handleBookmarkPost = (post) => {
    if (_.isNil(currentUser)) {
      showWarning().then((result) => {
        if (result.isConfirmed) {
          navigate('/sign-in');
        }
      });
    } else {
      if (post.isBookmarked) {
        dispatch(bookmarkActions.unBookmark({ bookmarkId: post?.bookmarkedDetail.bookmarkId }));
      } else {
        dispatch(
          bookmarkActions.createBookmark({
            postId: post?.id,
            userId: currentUser?.id,
          }),
        );
        if (currentUser?.id !== +post?.userId) {
          dispatch(
            wrapperActions.createNewNotification({
              postId: post?.id,
              type: 'bookmarked',
              reactionType: null,
              userId: currentUser?.id,
            }),
          );
        }
      }
    }
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
            borderRadius={2}
            className={styles.shorts__list}>
            {shorts?.length ? (
              displayShorts?.map((post) => (
                <Box key={post?.id} className={styles.shorts__card}>
                  <Box className={styles.shorts__card__header}>
                    <Stack direction='row' alignItems='center' justifyContent='space-between'>
                      <Stack direction='row' alignItems='center' spacing={2}>
                        <Avatar
                          src={post?.profilePhotoUrl}
                          onClick={() => navigate(`/profile/${post?.userId}`)}
                          sx={{ cursor: 'pointer' }}
                        />
                        <Stack
                          alignItems='flex-start'
                          justifyContent='flex-start'
                          onClick={() => navigate(`/profile/${post?.userId}`)}
                          sx={{ cursor: 'pointer' }}>
                          <Typography
                            fontWeight={600}
                            whiteSpace='nowrap'
                            textOverflow='ellipsis'
                            overflow='hidden'
                            className={styles.shorts__card__header__username}>
                            {post?.fullName}
                          </Typography>
                          <Typography fontSize={12}>{post?.createdAt}</Typography>
                        </Stack>
                      </Stack>
                      {currentUser?.id !== post?.userId ? (
                        <Button
                          variant='contained'
                          color={post?.isFollowingUser ? 'error' : 'primary'}
                          onClick={() => handleFollowUser(post)}>
                          {post?.isFollowingUser ? 'Unfollow' : 'Follow'}
                        </Button>
                      ) : null}
                    </Stack>
                  </Box>
                  <Box className={styles.shorts__card__body}>
                    <Typography variant='h5' marginY={2}>
                      {post?.title}
                    </Typography>
                    <Grid container spacing={2} width='100%'>
                      <Grid item md={12} width='100%'>
                        <ReactPlayer light url={post?.videoYtbUrl} width='100%' height='440px' />
                      </Grid>
                      <Grid item md={12} width='100%'>
                        <Stack
                          direction='row'
                          alignItems='center'
                          justifyContent='space-between'
                          spacing={2}
                          className={styles.shorts__card__footer}>
                          <Typography>
                            <strong>Views: {post?.views}</strong>
                          </Typography>
                          <Stack direction='row' alignItems='center' spacing={1}>
                            <Button
                              variant={post?.isBookmarked ? 'contained' : 'outlined'}
                              color={post?.isBookmarked ? 'error' : 'primary'}
                              startIcon={
                                <AppIcon
                                  icon={Bookmark}
                                  color={post?.isBookmarked ? '#fff' : '#0288d1'}
                                />
                              }
                              onClick={() => handleBookmarkPost(post)}>
                              {post?.isBookmarked ? 'Unbookmark' : 'Bookmark'}
                            </Button>
                            <Button
                              variant='contained'
                              color='primary'
                              startIcon={<AppIcon icon={Shortcut} color='#fff' />}
                              onClick={() => goToPostDetail(post?.id)}>
                              View more
                            </Button>
                          </Stack>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              ))
            ) : (
              <>
                <img src='/empty-data.jpg' alt='Empty data' />
              </>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default React.memo(Shorts);
