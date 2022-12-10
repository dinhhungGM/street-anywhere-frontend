import { Bookmark, Category, Description, Map, Room, Tag } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppCardV2 } from '../../../solutions/components/app-card-v2';
import { AppCarousel } from '../../../solutions/components/app-carousel';
import { AppDoughnutChart } from '../../../solutions/components/app-doughnut-chart';
import { AppHeading } from '../../../solutions/components/app-heading';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppListChips } from '../../../solutions/components/app-list-chips';
import { AppMapBox } from '../../../solutions/components/app-mapbox';
import { AppModal } from '../../../solutions/components/app-modal';
import { AppReactions } from '../../../solutions/components/app-reactions';
import { authSelectors } from '../../auth/store';
import { userActions, userSelectors } from '../../user';
import { postActions, postSelectors } from '../store';
import { PostComments } from './components/post-comments';
import styles from './styles.module.scss';
import SweetAlert from 'sweetalert2';
import { bookmarkActions } from '../../bookmark';
import { wrapperActions } from '../../wrapper/store';
import { reactionsActions, reactionsSelectors } from '../../reactions/store';
import { IPost, IReaction } from '../../../solutions/models/postModels';

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const currentPost = useAppSelector(postSelectors.selectSelectedPost);
  const relevantPosts = useAppSelector(postSelectors.selectRelevantPost);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const followingUsers = useAppSelector(userSelectors.selectedFollowingUsers);
  const reactionList = useAppSelector(reactionsSelectors.selectReactionList);
  const [isOpenMap, setIsOpenMap] = useState<boolean>(false);
  const [currentCoord, setCurrentCoord] = useState<{ long: number; lat: number; } | null>(null);
  const descriptionRef = useRef<any>();

  //#region Handling map
  const showMap = (): void => {
    setIsOpenMap(true);
  };

  const hideMap = useCallback((): void => {
    setIsOpenMap(false);
  }, []);
  //#endregion

  //#region Handling bookmark

  //#endregion

  //#region Handling display post
  const constructReactionDetail = (reactions: IReaction[]) => {
    if (!reactions.length) {
      return null;
    }
    const reaction = _.find(reactions, (item) => {
      const reactedItem = _.find(item.reactedUsers, (item) => item.userId === currentUser?.id);
      return !!reactedItem;
    });
    if (!reaction) {
      return null;
    }
    const reactedUser = _.find(reaction.reactedUsers, (item) => item.userId === currentUser?.id);
    return {
      ...reactedUser,
      reactionType: reaction.reactionType,
    };
  };
  const post = useMemo(() => {
    if (_.isNil(currentUser) || _.isNil(currentPost)) {
      return currentPost;
    } else {
      const reactedDetail = constructReactionDetail(currentPost?.reactions);
      const bookmarkedDetail = _.find(currentPost.bookmarks, (item) => item.userId === currentUser?.id);
      const followingDetail = _.find(followingUsers, (item) => item.userId === currentUser?.id);
      return {
        ...currentPost,
        isReacted: !!reactedDetail,
        isBookmarked: !!bookmarkedDetail,
        isFollowingUser: !!followingDetail,
        reactedDetail,
        bookmarkedDetail,
        followingDetail,
      } as IPost;
    }
  }, [currentUser, currentPost, followingUsers]);
  //#endregion

  //#region Toggle bookmark
  const handleBookmark = (): void => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Warning',
        icon: 'info',
        text: 'You are not sign in',
      });
    } else {
      if (post?.isBookmarked) {
        dispatch(bookmarkActions.unBookmark({ bookmarkId: post?.bookmarkedDetail.bookmarkId, isDetailPage: true }));
      } else {
        dispatch(bookmarkActions.createBookmark({ postId: post?.id, userId: currentUser?.id, isDetailPage: true }));
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
  };
  //#endregion

  //#region Handling reaction
  const removeReaction = (postReactionId: number): void => {
    dispatch(reactionsActions.removeReaction(postReactionId));
  };

  const updateCurrentReaction = (postReactionId: number, newReactionTypeId: number): void => {
    dispatch(reactionsActions.changeReaction({ postReactionId, reactionId: newReactionTypeId }));
  };

  const createNewReaction = (postId: number, reactionId: number, userId: number, reactionType: string | null): void => {
    dispatch(
      reactionsActions.addReaction({
        postId,
        reactionId,
        userId,
        reactionType,
      }),
    );
    dispatch(
      wrapperActions.createNewNotification({
        postId,
        userId,
        type: 'reacted',
        reactionType,
      }),
    );
  };

  const isSameReactionType = (clickedReactionType: string, currentReactionType: string): boolean => {
    return clickedReactionType === currentReactionType;
  };

  const handleReactPost = useCallback(
    (reactionType: string) => {
      if (_.isNil(currentUser)) {
        SweetAlert.fire({
          title: 'Notification',
          icon: 'warning',
          text: 'You are not sign in',
        });
      } else {
        if (post) {
          if (reactionType === 'Remove') {
            // Case reacted
            if (post?.isReacted) {
              removeReaction(post?.reactedDetail.postReactionId);
            }
          } else {
            const reaction = _.find(reactionList, (item) => _.isEqual(item.reactionType, reactionType));
            if (reaction) {
              // Case: create new reaction
              if (post?.isReacted && !isSameReactionType(reaction.reactionType, post?.reactedDetail.reactionType)) {
                updateCurrentReaction(post?.reactedDetail.postReactionId, reaction.id);
              } else {
                createNewReaction(post?.id, reaction?.id, currentUser?.id, null);
              }
              // Create: Update current reaction
            } else {
              SweetAlert.fire({
                title: 'Notification',
                icon: 'error',
                text: 'The reaction icon does not exist. Please contact administrator to support',
              });
            }
          }
        }
      }
    },
    [post],
  );
  //#endregion

  //#region Handling API
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentCoord({ long: position.coords.longitude, lat: position.coords.latitude });
    });
    dispatch(postActions.getPostByIdAsync(+postId));
    dispatch(reactionsActions.getReactionList());
    if (currentUser) {
      dispatch(userActions.getFollowingUsers(currentUser?.id));
    }
    return () => {
      dispatch(postActions.resetPostDetail());
      dispatch(userActions.resetAllData());
    };
  }, []);

  useEffect(() => {
    if (currentPost) {
      dispatch(
        postActions.getPostRelevantToCurrentPost({
          categories: currentPost?.categories,
          hashtags: currentPost?.tags,
          postId: currentPost?.id,
        }),
      );
      if (descriptionRef.current) {
        descriptionRef.current.innerHTML = currentPost.description || '(No description)';
      }
    }
  }, [currentPost]);
  //#endregion

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
                  <AppReactions
                    boxShadowSize={2}
                    onClickReactionIcon={handleReactPost}
                    isReacted={post?.isReacted}
                    reactedDetail={post?.reactedDetail}
                  />
                  <Box className={styles.post__details__reactions__container}>
                    <Button
                      className={styles.post__details__reactions__btn}
                      color='primary'
                      variant={post?.isBookmarked ? 'contained' : 'outlined'}
                      onClick={handleBookmark}>
                      <AppIcon icon={Bookmark} color={post?.isBookmarked ? '#fff' : '#84849d'} />
                      <Typography marginLeft={1}>Save</Typography>
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
              <Typography
                marginTop={1}
                textAlign='justify'
                className={styles.post__details__user__description}
                ref={descriptionRef}></Typography>
            </Box>
          </Grid>
        </Grid>
        <Box className={styles.post__details__comment}>
          <PostComments currentUserId={currentUser?.id} ownerId={post?.userId} postId={post?.id} key={post?.id} />
        </Box>
        <Box className={styles.post__details__stats}>
          <Box marginY={2}>
            <AppHeading heading='Number of reactions' />
          </Box>
          {post?.reactions.length ? (
            <AppDoughnutChart data={post?.reactions} labelField='reactionType' valueField='total' />
          ) : (
            <Typography textAlign='center' fontStyle='italic'>
              No data
            </Typography>
          )}
        </Box>
        <Box className={styles.post__details__relevant}>
          <Box marginY={2}>
            <AppHeading heading='More like this' />
          </Box>
          {relevantPosts && relevantPosts.length ? (
            <Stack alignItems='center' justifyContent='center' paddingX={4} marginBottom={2}>
              <AppCarousel height='fit-content'>
                {relevantPosts.map((post) => (
                  <AppCardV2 key={post?.id} post={post} isFixedSize />
                ))}
              </AppCarousel>
            </Stack>
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
        height='60vh'
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
