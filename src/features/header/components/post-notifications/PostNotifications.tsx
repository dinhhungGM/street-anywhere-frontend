import { Avatar, Box, Menu, MenuItem, Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { wrapperModels } from '../../../wrapper/store';

const COLOR_SCHEMA = {
  reacted: '#eab171',
  commented: '#44ff00',
  bookmarked: '#0288d1',
};
interface IPostNotificationsProps {
  anchorElement: HTMLElement;
  onClose: () => any;
  details?: wrapperModels.IPostNotification[];
}
const PostNotifications = ({ anchorElement, details = [], onClose }: IPostNotificationsProps) => {
  const isOpen = Boolean(anchorElement);
  const navigate = useNavigate();

  return (
    <>
      <Menu
        id='basic-menu'
        anchorEl={anchorElement}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: '600px',
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}>
        {details.length ? (
          details.map((notification) => (
            <MenuItem
              key={notification?.id}
              sx={{
                marginY: '8px',
                paddingY: '12px',
                backgroundColor: notification?.isSeen ? 'initial' : 'rgba(0, 90, 0, 0.1)',
              }}
              onClick={() => navigate(`/posts/${ notification?.postId }`)}>
              <Stack direction='row' spacing={2} alignItems='center' justifyContent='flex-start'>
                <Avatar src={notification?.profilePhotoUrl} alt='Avatar' />
                <Box>
                  <Typography
                    sx={{
                      maxWidth: '320px',
                      whiteSpace: 'pre-wrap',
                    }}>
                    <strong>{notification?.fullName}</strong>
                    <span
                      style={{
                        color: COLOR_SCHEMA[notification?.type] || 'initial',
                        margin: '0 4px',
                      }}>
                      {notification?.type}
                    </span>
                    <strong
                      style={{
                        marginRight: notification?.type === 'reacted' ? '4px' : '0',
                      }}>
                      {notification?.type === 'reacted' && notification?.reactionType}
                    </strong>
                    your post
                    <strong
                      style={{
                        marginLeft: '4px',
                      }}>
                      {notification?.shortTitle}
                    </strong>
                  </Typography>
                  <Typography fontStyle='italic' fontSize={12}>
                    {notification?.createdAt}
                  </Typography>
                </Box>
              </Stack>
            </MenuItem>
          ))
        ) : (
          <Typography fontStyle='italic' padding={2}>
            No notifications
          </Typography>
        )}
      </Menu>
    </>
  );
};

export default memo(PostNotifications);
