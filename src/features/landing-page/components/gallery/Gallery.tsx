import React, { useEffect } from 'react';
import { Masonry } from '@mui/lab';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { landingPageSelectors, landingPageActions } from '../../store';
import { Box } from '@mui/material';
import { AppCard } from '../../../../solutions/components/app-card';

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
              />
            </Box>
          ))}
      </Masonry>
    </>
  );
};

export default Gallery;
