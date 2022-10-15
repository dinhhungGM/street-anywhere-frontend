import { MoreVert } from '@mui/icons-material';
import { IconButton, Menu } from '@mui/material';
import React, { useRef, useState } from 'react';
import { AppIcon } from '../app-icon';

const AppMoreMenu = ({ children }) => {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <AppIcon icon={MoreVert} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {children}
      </Menu>
    </>
  );
};

export default React.memo(AppMoreMenu);
