import { Box, Paper, Stack } from '@mui/material';
import { LeftMenu } from './components/left-menu';
import { MiddleMenu } from './components/middle-menu';
import { RightMenu } from './components/right-menu';
import styles from './styles.module.scss';

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
          <Box className={styles['middle-menu']}>
            <MiddleMenu />
          </Box>
          <Box className={styles['right-menu']}>
            <RightMenu />
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Header;
