import { Box } from '@mui/material';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { IPost } from '../../solutions/models/postModels';
import { useAppDispatch } from '../../app/hooks';
import { default as axios } from './../../solutions/services/axios';
import { wrapperActions } from '../wrapper/store';
import { AppTrendingCard } from '../../solutions/components/app-trending-card';
import { Masonry } from '@mui/lab';

const Hots = () => {
  const [trendingPosts, setTrendingPosts] = useState<IPost[]>([]);
  const dispatch = useAppDispatch();

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

    getTrendingPosts();
  }, []);

  return (
    <Box className={styles.hots}>
      <Masonry
        columns={{ xs: 1, sm: 3, md: 4, lg: 5, xl: 6 }}
        spacing={2}
        sx={{
          width: '100%',
        }}>
        {trendingPosts.map((post) => (
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
            profilePhotoUrl={post?.profilePhotoUrl}
            totalReaction={post?.totalReactions}
          />
        ))}
      </Masonry>
    </Box>
  );
};

export default Hots;
