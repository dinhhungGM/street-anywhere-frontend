import { Box, Paper, Stack } from '@mui/material';
import { LeftMenu } from './components/left-menu';
import { MiddleMenu } from './components/middle-menu';
import { RightMenu } from './components/right-menu';

const Header = () => {
  return (
    <>
      <Box
        paddingX={2}
        sx={{
          background: '#fff',
        }}
        component={Paper}
        elevation={2}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <LeftMenu />
          <MiddleMenu />
          <RightMenu />
        </Stack>
      </Box>
    </>
  );
};

export default Header;
