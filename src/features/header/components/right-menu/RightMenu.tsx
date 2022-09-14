import { Add, Login, PersonAdd, Search } from '@mui/icons-material';
import { Drawer, IconButton, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { SearchBox } from '../search-box';
import { FeatureMenu } from './../feature-menu';

const RightMenu = () => {
  const [isOpenSearchBox, setIsOpenSearchBox] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenFeatureMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const showFeatureMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Stack spacing={2} alignItems='center' direction='row'>
        <Tooltip title='Search'>
          <IconButton size='large' color='warning' onClick={() => setIsOpenSearchBox(true)}>
            <AppIcon component={Search} color='#747df6' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Features'>
          <IconButton
            size='large'
            color='success'
            aria-haspopup='true'
            aria-expanded={isOpenFeatureMenu ? 'true' : undefined}
            aria-controls={isOpenFeatureMenu ? 'basic-menu' : undefined}
            onClick={showFeatureMenu}
          >
            <AppIcon component={Add} color='#44ff00' />
          </IconButton>
        </Tooltip>
        <Tooltip title='Sign in' onClick={() => navigate('/sign-in')}>
          <IconButton size='large'>
            <AppIcon component={Login} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Sign up' onClick={() => navigate('/sign-up')}>
          <IconButton size='large'>
            <AppIcon component={PersonAdd} />
          </IconButton>
        </Tooltip>
        <FeatureMenu anchorEl={anchorEl} onClose={() => setAnchorEl(null)} isOpen={isOpenFeatureMenu} />
        <Drawer anchor='bottom' open={isOpenSearchBox} onClose={() => setIsOpenSearchBox(false)}>
          <SearchBox />
        </Drawer>
      </Stack>
    </>
  );
};

export default RightMenu;
