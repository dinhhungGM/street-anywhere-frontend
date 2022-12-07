import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
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
    </Box>
  );
};

export default TopVideos;
