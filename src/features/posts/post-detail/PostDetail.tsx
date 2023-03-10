import { ArrowBack, Bookmark, Category, Description, Map, Room, Tag } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useNavigate, useParams } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppCardV2 } from '../../../solutions/components/app-card-v2';
import { AppCarousel } from '../../../solutions/components/app-carousel';
import { AppHeading } from '../../../solutions/components/app-heading';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppListChips } from '../../../solutions/components/app-list-chips';
import { AppListUserReact } from '../../../solutions/components/app-list-user-react';
import { AppMapBox } from '../../../solutions/components/app-mapbox';
import { AppModal } from '../../../solutions/components/app-modal';
import { AppReactions } from '../../../solutions/components/app-reactions';
import { IBookmark, IPost } from '../../../solutions/models/postModels';
import { authSelectors } from '../../auth/store';
import { bookmarkActions } from '../../bookmark';
import { reactionsActions, reactionsSelectors } from '../../reactions/store';
import { userActions, userSelectors } from '../../user';
import { wrapperActions } from '../../wrapper/store';
import { postActions, postSelectors } from '../store';
import { PostComments } from './components/post-comments';
import styles from './styles.module.scss';

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const currentPost = useAppSelector(postSelectors.selectSelectedPost);
  const relevantPosts = useAppSelector(postSelectors.selectRelevantPost);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const followingUsers = useAppSelector(userSelectors.selectedFollowingUsers);
  const bookmarkedPost = useAppSelector(userSelectors.selectBookmarkedPosts);
  const reactionList = useAppSelector(reactionsSelectors.selectReactionList);
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false);
  const [currentCoord, setCurrentCoord] = useState<{ long: number; lat: number } | null>(null);
  const descriptionRef = useRef<any>();
  const navigate = useNavigate();

  //#region Handling map
  const showMap = (): void => {
    setIsOpenMap(true);
  };

  const hideMap = useCallback((): void => {
    setIsOpenMap(false);
  }, []);
  //#endregion

  //#region Handling display post
  const constructFollowingDetail = (ownerId: number) => {
    if (!followingUsers || !followingUsers.length) {
      return null;
    }
    const data = _.find(followingUsers, (item) => item.followerId === ownerId);
    return data || null;
  };
  const constructBookmarkedDetail = (bookmarks: IBookmark[]) => {
    if (!bookmarks || !bookmarks.length) {
      return null;
    }
    const data = _.find(bookmarks, (item) => item.userId === currentUser?.id);
    return data || null;
  };
  const constructReactedDetail = () => {
    if (!currentPost?.reactions || !currentPost?.reactions.length) {
      return null;
    }
    const data = _.find(currentPost?.reactions, (item) => {
      // Determine user was reacted
      const reactedUser = _.find(item.reactedUsers, (user) => user.userId === currentUser?.id);
      return !!reactedUser;
    });
    if (!data) {
      return null;
    }
    // Extract reacted user: postReactionId,...
    const reactUser = _.find(data.reactedUsers, (user) => user.userId === currentUser?.id);
    return { reactionType: data.reactionType, ...reactUser };
  };
  const post = useMemo(() => {
    if (_.isNil(currentPost)) {
      return null;
    }
    const followingDetail = constructFollowingDetail(currentPost?.userId);
    const bookmarkedDetail = constructBookmarkedDetail(currentPost?.bookmarks);
    const reactedDetail = constructReactedDetail();
    const newPost = {
      ...currentPost,
      isFollowingUser: !!followingDetail,
      followingDetail,
      isBookmarked: !!bookmarkedDetail,
      bookmarkedDetail,
      isReacted: !!reactedDetail,
      reactedDetail,
    } as IPost;
    return newPost;
  }, [currentUser, currentPost, followingUsers]);
  //#endregion

  const displayRelevantPosts = useMemo(() => {
    if (_.isNil(relevantPosts)) {
      return [];
    }
    return _.map(relevantPosts, (post) => {
      const followingDetail = constructFollowingDetail(post?.userId);
      const bookmarkedDetail = _.find(bookmarkedPost, (item) => item.postId === post?.id);
      return {
        ...post,
        isFollowingUser: !!followingDetail,
        followingDetail,
        isBookmarked: !!bookmarkedDetail,
        bookmarkedDetail,
      } as IPost;
    });
  }, [currentUser, relevantPosts, followingUsers, bookmarkedPost]);
  //#endregion

  //#region Toggle bookmark
  const handleBookmark = (): void => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Warning',
        icon: 'info',
        text: 'You are not sign in',
        confirmButtonText: 'Sign in',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/sign-in');
        }
      });
    } else {
      if (post?.isBookmarked) {
        dispatch(
          bookmarkActions.unBookmark({
            bookmarkId: post?.bookmarkedDetail.bookmarkId,
            isDetailPage: true,
          }),
        );
      } else {
        dispatch(
          bookmarkActions.createBookmark({
            postId: post?.id,
            userId: currentUser?.id,
            isDetailPage: true,
          }),
        );
        if (post?.userId !== currentUser?.id) {
          dispatch(
            wrapperActions.createNewNotification({
              postId: post?.id,
              userId: currentUser?.id,
              type: 'bookmarked',
              reactionType: null,
            }),
          );
        }
      }
    }
  };
  //#endregion

  //#region Handling reaction
  const removeReaction = (postReactionId: number, postId: number): void => {
    dispatch(reactionsActions.removeReaction({ postReactionId, postId }));
  };

  const updateCurrentReaction = (
    postReactionId: number,
    newReactionTypeId: number,
    postId: number,
  ): void => {
    dispatch(
      reactionsActions.changeReaction({ postReactionId, reactionId: newReactionTypeId, postId }),
    );
  };

  const createNewReaction = (
    postId: number,
    reactionId: number,
    userId: number,
    reactionType: string | null,
  ): void => {
    dispatch(
      reactionsActions.addReaction({
        postId,
        reactionId,
        userId,
        reactionType,
      }),
    );
    if (currentUser?.id !== userId) {
      dispatch(
        wrapperActions.createNewNotification({
          postId,
          userId,
          type: 'reacted',
          reactionType,
        }),
      );
    }
  };

  const isSameReactionType = (
    clickedReactionType: string,
    currentReactionType: string,
  ): boolean => {
    return clickedReactionType === currentReactionType;
  };

  const handleReactPost = (reactionType: string) => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Notification',
        icon: 'warning',
        text: 'You are not sign in',
      }).then(() => {
        navigate('/sign-in');
      });
    } else {
      const reactionDetail = constructReactedDetail();
      const isReacted = !!reactionDetail;
      if (reactionType === 'Remove') {
        isReacted && removeReaction(reactionDetail.postReactionId, currentPost?.id);
      } else {
        const reaction = _.find(reactionList, (item) => item.reactionType === reactionType);
        if (isReacted) {
          if (!isSameReactionType(reactionType, reactionDetail.reactionType)) {
            updateCurrentReaction(reactionDetail.postReactionId, reaction.id, currentPost?.id);
          }
        } else {
          createNewReaction(currentPost?.id, reaction?.id, currentUser?.id, reactionType);
        }
      }
    }
  };
  //#endregion

  const handleFollow = (e) => {
    e.stopPropagation();
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'You are not sign in',
        showCancelButton: true,
        confirmButtonText: 'Sign in',
      }).then((result) => {
        result.isConfirmed && navigate('/sign-in');
      });
    } else {
      const payload = { userId: currentUser?.id, followerId: currentPost?.userId };
      if (post?.isFollowingUser) {
        dispatch(userActions.unfollowUser(payload));
      } else {
        dispatch(userActions.followUser(payload));
      }
    }
  };

  //#region Handling API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentCoord({ long: position.coords.longitude, lat: position.coords.latitude });
    });
    dispatch(postActions.getPostByIdAsync(+postId));
    dispatch(reactionsActions.getReactionList());
    dispatch(postActions.incrementViewAsync(+postId));
    if (currentUser) {
      dispatch(userActions.getFollowingUsers(currentUser?.id));
      dispatch(userActions.getBookmarkedPost(currentUser?.id));
    }
    return () => {
      dispatch(postActions.resetPostDetail());
      dispatch(userActions.resetAllData());
    };
  }, [postId]);

  useEffect(() => {
    if (currentPost) {
      if (descriptionRef.current) {
        descriptionRef.current.innerHTML = currentPost.description || '(No description)';
      }
    }
  }, [currentPost]);
  //#endregion

  return (
    <>
      <Box className={styles.post__details}>
        <Button
          startIcon={<AppIcon icon={ArrowBack} color='#fff' />}
          variant='contained'
          onClick={() => navigate(-1)}>
          Back
        </Button>
        <Typography variant='h2' textAlign='center' fontWeight={700} marginTop={1}>
          {post?.title}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Box className={styles.post__details__media}>
              <Stack width='100%' spacing={2}>
                <Box className={styles.post__details__media__content}>
                  {post?.type === 'video' ? (
                    <ReactPlayer
                      playing
                      controls
                      url={post?.videoYtbUrl}
                      width='100%'
                      height='100%'
                    />
                  ) : (
                    <img src={post?.imageUrl} alt={post?.title} />
                  )}
                </Box>
                <Box className={styles.post__details__reactions}>
                  <AppReactions
                    boxShadowSize={2}
                    onClickReactionIcon={handleReactPost}
                    isReacted={post?.isReacted}
                    reactedDetail={post?.reactedDetail}
                  />
                  <Box className={styles.post__details__reactions__container}>
                    <Button
                      className={styles.post__details__reactions__btn}
                      color={post?.isBookmarked ? 'error' : 'primary'}
                      variant={post?.isBookmarked ? 'contained' : 'outlined'}
                      onClick={handleBookmark}>
                      <AppIcon icon={Bookmark} color={post?.isBookmarked ? '#fff' : '#0288d1'} />
                      <Typography marginLeft={1}>
                        {post?.isBookmarked ? 'Unbookmark' : 'Bookmark'}
                      </Typography>
                    </Button>
                    {post?.isHasLocation && (
                      <Button
                        className={styles.post__details__reactions__btn}
                        color='success'
                        variant='contained'
                        onClick={showMap}>
                        <AppIcon icon={Map} color='#fff' />
                        <Typography marginLeft={1}>View on map</Typography>
                      </Button>
                    )}
                  </Box>
                </Box>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Box
              className={styles.post__details__user}
              onClick={() => navigate(`/profile/${post?.userId}`)}>
              <Stack
                direction='row'
                alignItems='center'
                justifyContent='space-between'
                padding={4}
                className={styles.post__details__user__background}>
                <Stack direction='row' alignItems='center' spacing={3} sx={{ cursor: 'pointer' }}>
                  <Avatar src={post?.profilePhotoUrl} />
                  <Box>
                    <Typography fontWeight={700}>{post?.fullName}</Typography>
                    <Typography fontSize={12} fontStyle='italic'>
                      {new Date(post?.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
                {currentUser?.id !== post?.userId && (
                  <Button
                    variant='contained'
                    color={post?.isFollowingUser ? 'error' : 'primary'}
                    onClick={handleFollow}
                    className={styles.follow__btn}>
                    {post?.isFollowingUser ? 'Unfollow' : 'Follow'}
                  </Button>
                )}
              </Stack>
              <Stack spacing={1}>
                <AppListChips data={post?.tags} icon={Tag} title='Tags' iconColor='#84849d' />
                <AppListChips
                  data={post?.categories}
                  icon={Category}
                  title='Categories'
                  iconColor='#ff5b00'
                />
              </Stack>
              {post?.location && (
                <Stack
                  direction='row'
                  alignItems='center'
                  justifyContent='flex-start'
                  spacing={1}
                  marginTop={1}>
                  <AppIcon icon={Room} color='#e60023' />
                  <Typography fontWeight={700}>Address:</Typography>
                  <Typography fontStyle='italic'>{post?.location}</Typography>
                </Stack>
              )}
              <Stack direction='row' alignItems='center' spacing={1} marginTop={1}>
                <AppIcon icon={Description} />
                <Typography fontWeight={700}>Description:</Typography>
              </Stack>
              <Typography
                marginTop={1}
                textAlign='justify'
                className={styles.post__details__user__description}
                ref={descriptionRef}></Typography>
            </Box>
          </Grid>
        </Grid>
        <Box className={styles.post__details__comment}>
          <PostComments
            currentUserId={currentUser?.id}
            ownerId={post?.userId}
            postId={post?.id}
            key={post?.id}
          />
        </Box>
        <Box className={styles.post__details__stats}>
          <Box marginY={2}>
            <AppHeading heading='Number of reactions' />
          </Box>
          {post?.reactions.length ? (
            <Box component={Paper} elevation={2} className={styles.post__details__stats__chart}>
              <AppListUserReact postId={currentPost?.id} />
            </Box>
          ) : (
            <Typography textAlign='center' fontStyle='italic'>
              No data
            </Typography>
          )}
        </Box>
      </Box>
      <AppModal
        isOpen={isOpenMap}
        onOk={hideMap}
        onClose={hideMap}
        isDisplayCancelButton={false}
        isDisplayOkButton
        title='Map'
        width='60vw'
        height='60vh !important'
        okText='Close'>
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
