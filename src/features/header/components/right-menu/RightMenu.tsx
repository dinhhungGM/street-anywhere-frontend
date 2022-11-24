import {
  Add,
  AdminPanelSettings,
  Login, Notifications, Person,
  PersonAdd,
  PowerSettingsNew,
  Search
} from '@mui/icons-material';
import { Badge, Drawer, IconButton, Stack, Tooltip } from '@mui/material';
import _ from 'lodash';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { AppIconButton } from '../../../../solutions/components/app-icon-button';
import { authActions, authSelectors } from '../../../auth/store';
import { SearchBox } from '../search-box';

const RightMenu = () => {
  const [isOpenSearchBox, setIsOpenSearchBox] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);

  const handleSignOut = (): void => {
    dispatch(authActions.signOut());
    navigate('/');
  };

  const navigateToCreateNewPostPage = (): void => {
    navigate('/create-new-post');
  };

  return (
    <>
      <Stack spacing={2} alignItems='center' direction='row'>
        <Tooltip title='Search'>
          <IconButton size='large' color='warning' onClick={() => setIsOpenSearchBox(true)}>
            <AppIcon icon={Search} color='#747df6' />
          </IconButton>
        </Tooltip>
        <AppIconButton
          tooltip='Create new post'
          icon={<AppIcon icon={Add} color='#44ff00' />}
          onClick={navigateToCreateNewPostPage}
        />
        {_.isNil(currentUser) ? (
          <>
            <Tooltip title='Sign in' onClick={() => navigate('/sign-in')}>
              <IconButton size='large'>
                <AppIcon icon={Login} />
              </IconButton>
            </Tooltip>
            <Tooltip title='Sign up' onClick={() => navigate('/sign-up')}>
              <IconButton size='large'>
                <AppIcon icon={PersonAdd} />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title='Profile'>
              <IconButton size='large' onClick={() => navigate('/profile')}>
                <AppIcon icon={Person} color='#0288d1' />
              </IconButton>
            </Tooltip>
            <Tooltip title='Notification'>
              <IconButton size='large'>
                <Badge color='error' badgeContent={10}>
                  <AppIcon icon={Notifications} color='#84849d' />
                </Badge>
              </IconButton>
            </Tooltip>
            {currentUser?.isAdmin ? (
              <Tooltip title='Admin Dashboard'>
                <IconButton size='large' onClick={() => navigate('/admin-dashboard')}>
                  <AppIcon icon={AdminPanelSettings} color='#ff5b00' />
                </IconButton>
              </Tooltip>
            ) : null}
            <IconButton size='large' onClick={handleSignOut}>
              <AppIcon icon={PowerSettingsNew} color='#e60023' />
            </IconButton>
          </>
        )}
        <Drawer anchor='bottom' open={isOpenSearchBox} onClose={() => setIsOpenSearchBox(false)}>
          <SearchBox />
        </Drawer>
      </Stack>
    </>
  );
};

export default RightMenu;
