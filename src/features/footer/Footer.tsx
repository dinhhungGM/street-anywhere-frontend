import { Copyright } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { AppIcon } from '../../solutions/components/app-icon';

const Footer = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#000',
          color: '#fff',
        }}>
        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1} padding={2}>
          <AppIcon icon={Copyright} color='#fff' />
          <Typography>Copyright: This product is developed by Phuong & Linh</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default memo(Footer);
