import { Search } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import { useEffect, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppCard } from '../../../../solutions/components/app-card';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { landingPageActions, landingPageSelectors } from '../../store';

const Gallery = () => {
  const displayPosts = useAppSelector(landingPageSelectors.selectPosts);
  const dispatch = useAppDispatch();
  const [queryParams] = useSearchParams();

  useEffect(() => {
    const page = queryParams.get('page');
    const category = queryParams.get('category');
    const tag = queryParams.get('tag');
    dispatch(landingPageActions.getPostsAsync({ page, category, tag }));
  }, [queryParams]);

  return (
    <>
      {displayPosts?.length ? (
        <Box
          sx={{
            height: 'fit-content',
            maxHeight: '1800px',
            overflowX: 'hidden',
            overflowY: 'scroll',
            padding: '12px',
            width: '100%',
          }}>
          <Masonry
            columns={{ sm: 1, md: 2, lg: 4, xl: 5 }}
            spacing={2}
            sx={{
              width: '100%',
            }}>
            {displayPosts &&
              displayPosts.map((post) => (
                <Box
                  sx={{
                    margin: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={post?.id}>
                  <AppCard
                    key={post?.id}
                    imgSrc={post?.imageUrl}
                    alt={post?.shortTitle}
                    author={post?.user.fullName}
                    avatarUrl={post?.user.profilePhotoUrl}
                    tags={post?.tags}
                    categories={post?.categories}
                    shortTitle={post?.shortTitle}
                    location={post?.location}
                    postId={post?.id}
                    type={post?.type}
                    videoYtbUrl={post?.videoYtbUrl}
                    views={post?.views}
                    reactionCount={post?.reactionCount}
                    bookmarkCount={post?.bookmarkCount}
                    commentCount={post?.commentCount}
                    createdAt={post?.createdAt}
                  />
                </Box>
              ))}
          </Masonry>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <AppIcon icon={Search} fontSize={120} />
          <Typography variant='h6' marginY={4}>
            No data found
          </Typography>
        </Box>
      )}
    </>
  );
};

export default memo(Gallery);
