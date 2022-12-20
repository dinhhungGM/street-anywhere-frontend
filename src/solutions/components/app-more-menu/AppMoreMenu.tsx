import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';
import React, { useRef, useState } from 'react';
import { boolean } from 'yup';
import { AppIcon } from '../app-icon';

interface IAppMoreMenuProps {
  bgColor?: string;
  children?: any;
  btnSize?: 'small' | 'medium' | 'large';
  isOpenMenu?: boolean;
  onOpen?: any;
  onClose?: any;
}
const AppMoreMenu = ({
  bgColor = 'initial',
  btnSize = 'medium',
  children = null,
  isOpenMenu,
  onOpen,
  onClose,
}: IAppMoreMenuProps) => {
  const ref = useRef(null);
  return (
    <>
      <IconButton ref={ref} onClick={onOpen} sx={{ backgroundColor: bgColor }} size={btnSize}>
        <AppIcon icon={MoreVert} />
      </IconButton>
      <Menu
        open={isOpenMenu}
        anchorEl={ref.current}
        onClose={onClose}
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
