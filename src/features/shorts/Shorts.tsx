import { Search } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppCard } from '../../solutions/components/app-card';
import { AppIcon } from '../../solutions/components/app-icon';
import * as shortAsyncActions from './store/shortsAsyncActions';
import * as shortsSelectors from './store/shortsSelectors';

const Shorts = () => {
  const dispatch = useAppDispatch();
  const shorts = useAppSelector(shortsSelectors.selectShorts);

  useEffect(() => {
    dispatch(shortAsyncActions.getShorts());
  }, []);

  return (
    <>
      <Box padding={4}>
        {shorts?.length ? (
          <Masonry columns={{ sm: 1, md: 3, lg: 4, xl: 5 }} spacing={2}>
            {shorts &&
              shorts.map((post) => (
                <Box
                  sx={{
                    margin: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={post?.id}
                >
                  <AppCard
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
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <AppIcon icon={Search} fontSize={120} />
            <Typography variant='h6' marginY={4}>
              No data found
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default React.memo(Shorts);
