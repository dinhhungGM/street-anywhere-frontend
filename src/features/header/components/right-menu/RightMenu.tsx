import { Add, Search } from '@mui/icons-material';
import { Drawer, IconButton, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';
import { FeatureMenu } from '../../feature-menu';
import { SearchBox } from '../search-box';

const RightMenu = () => {
  const [isOpenSearchBox, setIsOpenSearchBox] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpenFeatureMenu = Boolean(anchorEl);

  const showFeatureMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Stack spacing={2} alignItems='center' direction='row'>
        <Tooltip title='Search'>
          <IconButton size='large' color='warning' onClick={() => setIsOpenSearchBox(true)}>
            <Search />
          </IconButton>
        </Tooltip>
        <Tooltip title='Functions menu'>
          <IconButton
            size='large'
            color='success'
            aria-haspopup='true'
            aria-expanded={isOpenFeatureMenu ? 'true' : undefined}
            aria-controls={isOpenFeatureMenu ? 'basic-menu' : undefined}
            onClick={showFeatureMenu}
          >
            <Add />
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
