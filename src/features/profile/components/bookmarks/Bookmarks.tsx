import { Search } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Box, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { postActions, postSelectors } from '../../../posts/store';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { AppCard } from '../../../../solutions/components/app-card';

interface IBookmarkProps {
  userId?: number;
}

const Bookmarks = ({ userId }: IBookmarkProps) => {
  const storedPosts = useAppSelector(postSelectors.selectBookmark);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userId) {
      navigate('/sign-in');
    } else {
      dispatch(postActions.getStoredPostByUserId(userId));
    }
  }, []);
  return (
    <>
      <Box>
        <Typography variant='h3' marginY={2}>
          Bookmarks
        </Typography>
        <Divider />
        <Box className={styles['post-grid']}>
          {storedPosts?.posts?.length ? (
            <Masonry columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
              {storedPosts?.posts &&
                storedPosts?.posts.map((post) => (
                  <Box
                    sx={{
                      margin: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    key={post.id}
                  >
                    <AppCard
                      imgSrc={post.imageUrl}
                      alt={post.shortTitle}
                      tags={post.tags}
                      categories={post.categories}
                      shortTitle={post.shortTitle}
                      location={post.location}
                      postId={post.id}
                      type={post.type}
                      videoYtbUrl={post.videoYtbUrl}
                      isInProfilePage={true}
                      views={post.views}
                      reactionCount={post.reactionCount}
                      commentCount={post.commentCount}
                    />
                  </Box>
                ))}
            </Masonry>
          ) : (
            <Box className={styles['no-data']}>
              <AppIcon icon={Search} fontSize={120} />
              <Typography variant='h6' marginY={4}>
                No data found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Bookmarks;
