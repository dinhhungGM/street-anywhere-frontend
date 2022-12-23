import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';
import React, { useRef, useState } from 'react';
import { AppIcon } from '../app-icon';

interface IAppMoreMenuProps {
  onOpen?: any;
  children?: any;
  bgColor?: string;
  onClose?: any;
  isOpenMenu?: boolean;
  btnSize?: 'small' | 'medium' | 'large';
  isOpenInside?: boolean;
}
const AppMoreMenu = ({
  onOpen,
  onClose,
  isOpenMenu,
  btnSize = 'medium',
  children = null,
  bgColor = 'initial',
  isOpenInside = false,
}: IAppMoreMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  return (
    <>
      <IconButton
        ref={ref}
        onClick={isOpenInside ? openMenu : onOpen}
        sx={{ backgroundColor: bgColor }}
        size={btnSize}>
        <AppIcon icon={MoreVert} />
      </IconButton>
      <Menu
        open={isOpenInside ? isOpen : isOpenMenu}
        anchorEl={ref.current}
        onClose={isOpenInside ? closeMenu : onClose}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        onClick={isOpenInside ? closeMenu : null}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {children}
      </Menu>
    </>
  );
};

export default React.memo(AppMoreMenu);
