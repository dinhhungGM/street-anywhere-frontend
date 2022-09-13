import { Add, Login, Search } from '@mui/icons-material';
import { Drawer, IconButton, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { FeatureMenu } from '../../feature-menu';
import { SearchBox } from '../search-box';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { useNavigate } from 'react-router-dom';

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
            <AppIcon component={Search} />
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
            <AppIcon component={Add} />
          </IconButton>
        </Tooltip>
        <Tooltip title='Sign in'>
          <IconButton>
            <AppIcon component={Login} />
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
