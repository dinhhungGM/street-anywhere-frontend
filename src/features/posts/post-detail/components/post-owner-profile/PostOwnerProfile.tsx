import { Avatar, Box, Stack, Typography } from '@mui/material';
import { memo } from 'react';

interface IPostOwnerProfileProps {
  userId?: number;
  avatarUrl?: string;
  fullName?: string;
}

const PostOwnerProfile = ({ userId, avatarUrl, fullName }: IPostOwnerProfileProps) => {
  return (
    <>
      <Box paddingY={2}>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar alt={fullName} src={avatarUrl} />
          <Typography>{fullName}</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default memo(PostOwnerProfile);
