import { Menu } from '@mui/icons-material';
import { Box, Button, Drawer, Stack } from '@mui/material';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { SubLeftMenu } from '../sub-left-menu';
import styles from './styles.module.scss';

const HamburgerIcon = () => <AppIcon icon={Menu} color='#0288d1' />;

const LeftMenu = () => {
  const [isShowSubLeftMenu, setIsShowSubLeftMenu] = useState(false);
  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='flex-start' spacing={2}>
        <Box>
          <Button onClick={() => setIsShowSubLeftMenu(true)} variant='outlined' color='info'>
            <HamburgerIcon />
          </Button>
          <Drawer anchor='left' open={isShowSubLeftMenu} onClose={() => setIsShowSubLeftMenu(false)}>
            <SubLeftMenu onClose={() => setIsShowSubLeftMenu(false)} />
          </Drawer>
        </Box>
        <Box height={72}>
          <NavLink to='/'>
            <img src='/logo.png' alt='Logo' className={styles.logo} />
          </NavLink>
        </Box>
      </Stack>
    </>
  );
};

export default LeftMenu;
