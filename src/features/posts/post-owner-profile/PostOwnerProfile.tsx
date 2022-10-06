import { Box, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import styles from './styles.module.scss';

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
          <img src={avatarUrl} alt={fullName} className={styles.avatar} />
          <Typography>{fullName}</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default memo(PostOwnerProfile);
