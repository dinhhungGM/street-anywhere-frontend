import { Bookmark } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import React from 'react';
import { AppIcon } from '../../../solutions/components/app-icon';

interface IPostBookmarkProps {
  currentUserId?:number;
  postId?:number;
}

const PostBookmark = ({ currentUserId, postId }: IPostBookmarkProps) => {
  return (
    <>
      <Box paddingY={2}>
        <Button fullWidth startIcon={<AppIcon component={Bookmark} />} size='large'>Bookmark</Button>
      </Box>
    </>
  );
};

export default PostBookmark;
