import { Masonry } from '@mui/lab';
import { Box, Stack } from '@mui/material';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppTrendingCard } from '../../solutions/components/app-trending-card';
import { IPost } from '../../solutions/models/postModels';
import { authSelectors } from '../auth/store';
import { userSelectors } from '../user';
import { wrapperActions } from '../wrapper/store';
import { default as axios } from './../../solutions/services/axios';
import { userActions } from './../user';
import styles from './styles.module.scss';

const Hots = () => {
  const dispatch = useAppDispatch();
  const [trendingPosts, setTrendingPosts] = useState<IPost[]>([]);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const bookmarkedPosts = useAppSelector(userSelectors.selectBookmarkedPosts);
  const followingUsers = useAppSelector(userSelectors.selectedFollowingUsers);

  useEffect(() => {
    const getTrendingPosts = async () => {
      try {
        dispatch(wrapperActions.showLoading());
        const { data } = await axios.get('/posts/trending');
        setTrendingPosts(data.value);
      } catch (error) {
        dispatch(
          wrapperActions.showNotification({
            typeOfNotification: 'error',
            message: error.response.data.message,
          }),
        );
      } finally {
        dispatch(wrapperActions.hideLoading());
      }
    };
    if (currentUser) {
      dispatch(userActions.getBookmarkedPost(currentUser?.id));
      dispatch(userActions.getFollowingUsers(currentUser?.id));
    }
    getTrendingPosts();
    return () => {
      dispatch(userActions.resetAllData());
    };
  }, []);

  // Construct posts
  const displayTrendingPosts = useMemo(() => {
    if (!currentUser) {
      return trendingPosts;
    }
    return _.map(trendingPosts, (item) => {
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
  }, [trendingPosts, bookmarkedPosts, followingUsers]);

  return (
    <Box className={styles.hots}>
      {displayTrendingPosts?.length ? (
        <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 6 }} spacing={2}>
          {displayTrendingPosts.map((post) => (
            <AppTrendingCard
              key={post?.id}
              postId={post?.id}
              type={post?.type}
              views={post?.views}
              title={post?.title}
              userId={post?.userId}
              imageUrl={post?.imageUrl}
              fullName={post?.fullName}
              createdAt={post?.createdAt}
              videoYtbUrl={post?.videoYtbUrl}
              currentUserId={currentUser?.id}
              isBookmarked={post?.isBookmarked}
              totalReaction={post?.totalReactions}
              bookmarkDetail={post?.bookmarkedDetail}
              profilePhotoUrl={post?.profilePhotoUrl}
              isFollowingUser={post?.isFollowingUser}
              followingDetail={post?.followingDetail}
            />
          ))}
        </Masonry>
      ) : (
        <Stack alignItems='center' justifyContent='center'>
          <img src='/empty-data.jpg' alt='Empty data' />
        </Stack>
      )}
    </Box>
  );
};

export default Hots;
