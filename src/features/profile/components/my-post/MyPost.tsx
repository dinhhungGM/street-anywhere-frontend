import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { postActions, postSelectors } from '../../../posts/store';
import { useEffect } from 'react';

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
      </Box>
    </>
  );
};

export default MyPost;
