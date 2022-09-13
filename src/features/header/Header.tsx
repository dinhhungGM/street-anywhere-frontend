import { Box, Stack } from '@mui/material';
import { LeftMenu } from './components/left-menu';
import { MiddleMenu } from './components/middle-menu';
import { RightMenu } from './components/right-menu';

const Header = () => {
  return (
    <>
      <Box boxShadow={1} paddingX={2}>
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
