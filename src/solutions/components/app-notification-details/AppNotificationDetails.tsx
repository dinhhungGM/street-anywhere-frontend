import { Avatar, Box, Menu, Stack } from '@mui/material';
import { memo, useEffect } from 'react';

type IAppNotificationDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
};
const AppNotificationDetails = ({ isOpen, anchorEl, onClose }: IAppNotificationDetailsProps) => {
  return (
    <>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          style: {
            width: 280,
            padding: 12,
            borderRadius: 12,
          },
        }}>
        <Stack direction='row' spacing={2} alignItems='center' justifyContent='flex-start'>
          <Avatar />
          <Box></Box>
        </Stack>
      </Menu>
    </>
  );
};

export default memo(AppNotificationDetails);
