import { Search } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Box, Divider, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppCard } from '../../../../solutions/components/app-card';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { postActions, postSelectors } from '../../../posts/store';
import styles from './styles.module.scss';

interface IMyPostProps {
  userId: number;
}

const MyPost = ({ userId }: IMyPostProps) => {
  const myPosts = useAppSelector(postSelectors.selectMyPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(postActions.getPostsByUserIdAsync(userId));
  }, []);
  return (
    <>
      <Box>
        <Typography variant='h3' marginY={2}>
          My Posts ({myPosts?.length})
        </Typography>
        <Divider />
        <Box className={styles['post-grid']}>
          {myPosts?.length ? (
            <Masonry columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
              {myPosts &&
                myPosts.map((post) => (
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

export default MyPost;
