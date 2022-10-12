import { Comment } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { AppIcon } from '../../../../../solutions/components/app-icon';

interface PostCommentsProps {
  postId?: number;
}

const PostComments = ({ postId }: PostCommentsProps) => {
  return (
    <>
      <Button fullWidth size='large' variant='contained' startIcon={<AppIcon icon={Comment} color='#fff' />}>
        Comment
      </Button>
    </>
  );
};

export default PostComments;
