import { Box, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppCard } from '../../../../solutions/components/app-card';
import { landingPageActions, landingPageSelectors } from '../../store';

const TopVideos = () => {
  const dispatch = useAppDispatch();
  const topPosts = useAppSelector(landingPageSelectors.selectTopPosts);

  useEffect(() => {
    dispatch(landingPageActions.getTopPosts(null));
  }, []);
  return (
    <Box>
      <Typography variant='h4' fontWeight={700}>
        Top posts
      </Typography>
      <Stack paddingTop={2} spacing={2}>
        {topPosts?.map((post) => (
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
            isFullWidth={true}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default TopVideos;
