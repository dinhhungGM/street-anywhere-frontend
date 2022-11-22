import { Box, Paper, Typography } from '@mui/material';
import randomColor from 'randomcolor';
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
          background: randomColor({
            format: 'rgb',
            luminosity: 'dark',
          }),
        }}
        paddingY={1}>
        <Typography textAlign='center' variant='h6' fontWeight={700} color='#fff'>
          {label}
        </Typography>
      </Box>
      {children}
    </Box>
  );
};

export default React.memo(ProfileItem);
