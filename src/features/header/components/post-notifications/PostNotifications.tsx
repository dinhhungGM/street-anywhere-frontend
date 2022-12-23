import { Avatar, Box, Menu, MenuItem, Stack, Typography } from '@mui/material';
import _ from 'lodash';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { wrapperActions, wrapperModels } from '../../../wrapper/store';

const COLOR_SCHEMA = {
  reacted: '#eab171',
  commented: '#44ff00',
  bookmarked: '#0288d1',
  followed: '#10A19D',
};

const MSG_SCHEMA = {
  followed: 'you',
  reacted: 'your post',
  bookmarked: 'your post',
  commented: 'your post',
};
interface IPostNotificationsProps {
  anchorElement: HTMLElement;
  onClose: () => any;
  details?: wrapperModels.IPostNotification[];
}
const PostNotifications = ({ anchorElement, details = [], onClose }: IPostNotificationsProps) => {
  const isOpen = Boolean(anchorElement);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToPostDetail = (notification): void => {
    const unSeenIds = _.map(
      _.filter(details, (notification) => !notification.isSeen),
      'id',
    );
    if (unSeenIds.length) {
      dispatch(wrapperActions.changeNotificationStatus(unSeenIds));
    }
    navigate(`/posts/${ notification?.postId }`);
  };

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
              onClick={() => navigateToPostDetail(notification)}>
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
                    <span>{MSG_SCHEMA[notification?.type]}</span>
                    {notification?.type !== 'followed' ? (
                      <strong
                        style={{
                          marginLeft: '4px',
                        }}>
                        {notification.shortTitle}
                      </strong>
                    ) : null}
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
