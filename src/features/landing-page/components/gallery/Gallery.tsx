import { Masonry } from '@mui/lab';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppCard } from '../../../../solutions/components/app-card';
import { landingPageActions, landingPageSelectors } from '../../store';

const Gallery = () => {
  const displayPosts = useAppSelector(landingPageSelectors.selectPosts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(landingPageActions.getPostsAsync(null));
  }, []);

  return (
    <>
      <Masonry columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
        {displayPosts &&
          displayPosts.map((post) => (
            <Box
              sx={{
                margin: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              key={post.id}
            >
              <AppCard
                imgSrc={post.imageUrl}
                alt={post.shortTitle}
                author={post.user.fullName}
                avatarUrl={post.user.profilePhotoUrl}
                tags={post.tags}
                categories={post.categories}
                shortTitle={post.shortTitle}
                location={post.location}
                postId={post.id}
                type={post.type}
                videoYtbUrl={post.videoYtbUrl}
              />
            </Box>
          ))}
      </Masonry>
    </>
  );
};

export default Gallery;
