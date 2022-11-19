import { Copyright, Facebook } from '@mui/icons-material';
import { Avatar, Box, Grid, List, ListItem, ListItemIcon, Stack, Typography, ListItemButton } from '@mui/material';
import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { AppIcon } from '../../solutions/components/app-icon';
import { AppIconButton } from '../../solutions/components/app-icon-button';

const fixedPaths = ['/', '/shorts', '/reactions', '/hosts', '/explore'];

const Footer = () => {
  const location = useLocation();
  return (
    <>
      <Box
        sx={{
          width: '100%',
          position: fixedPaths.includes(location.pathname) ? 'fixed' : 'relative',
          bottom: fixedPaths.includes(location.pathname) ? 0 : 'unset',
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
          borderBottom='1px solid #ccc'
          paddingX={10}
        >
          <Typography>Get connected with us on social networks:</Typography>
          <Stack direction='row' spacing={1} alignItems='center'>
            <AppIconButton icon={<AppIcon icon={Facebook} color='0288d1' />} />
            <AppIconButton icon={<AppIcon icon={Facebook} />} />
            <AppIconButton icon={<AppIcon icon={Facebook} />} />
            <AppIconButton icon={<AppIcon icon={Facebook} />} />
          </Stack>
        </Stack>
        <Box>
          <Grid container spacing={2}>
            <Grid item sm={12} md={3}>
              <Avatar src='/logo.png' />
            </Grid>
            <Grid item sm={12} md={3}>
              Products
            </Grid>
            <Grid item sm={12} md={3}>
              Useful links
            </Grid>
            <Grid item sm={12} md={3}>
              Contact
            </Grid>
          </Grid>
        </Box>
        <Stack direction='row' alignItems='center' justifyContent='center'>
          <AppIcon icon={Copyright} color='#fff' />
          <Typography>Copyright: This product is developed by Phuong & Linh</Typography>
        </Stack>
      </Box>
    </>
  );
};

export default memo(Footer);
