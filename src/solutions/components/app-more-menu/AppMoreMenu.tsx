import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';
import React, { useRef, useState } from 'react';
import { AppIcon } from '../app-icon';

interface IAppMoreMenuProps {
  bgColor?: string;
  children?: any;
  btnSize?: 'small' | 'medium' | 'large';
}
const AppMoreMenu = ({
  bgColor = 'initial',
  btnSize = 'medium',
  children = null,
}: IAppMoreMenuProps) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = (e): void => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const closeMenu = (e): void => {
    e.stopPropagation();
    setIsOpen(false);
  };
  return (
    <>
      <IconButton ref={ref} onClick={openMenu} sx={{ backgroundColor: bgColor }} size={btnSize}>
        <AppIcon icon={MoreVert} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={closeMenu}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {children}
      </Menu>
    </>
  );
};

export default React.memo(AppMoreMenu);
