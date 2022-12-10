import { Box, Paper, Typography } from '@mui/material';
import React from 'react';

interface ProfileItemProps {
  label: string;
  children?: any;
}
const ProfileItem = ({ label, children }: ProfileItemProps) => {
  return (
    <Box component={Paper} elevation={2}>
      <Box
        sx={{
          backgroundColor: 'rgb(23, 3, 99)',
        }}
        paddingY={1}>
        <Typography textAlign='center' variant='h6' fontWeight={700} color='#fff'>
          {label}
        </Typography>
      </Box>
      <Box paddingX={1}>{children}</Box>
    </Box>
  );
};

export default React.memo(ProfileItem);
