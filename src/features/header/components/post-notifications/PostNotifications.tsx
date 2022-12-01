import { Menu, MenuItem, Typography } from '@mui/material';
import { memo } from 'react';
import { wrapperModels } from '../../../wrapper/store';

interface IPostNotificationsProps {
  anchorElement: HTMLElement;
  onClose: () => any;
  details?: wrapperModels.IPostNotification[];
}
const PostNotifications = ({ anchorElement, details = [], onClose }: IPostNotificationsProps) => {
  const isOpen = Boolean(anchorElement);
  return (
    <>
      <Menu
        id='basic-menu'
        anchorEl={anchorElement}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}>
        {details.length ? (
          details.map((notification) => <MenuItem key={notification.id}>{notification.id}</MenuItem>)
        ) : (
          <Typography fontStyle='italic'>You don't have any notifications</Typography>
        )}
      </Menu>
    </>
  );
};

export default memo(PostNotifications);
