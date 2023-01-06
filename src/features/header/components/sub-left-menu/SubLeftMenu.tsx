import {
  Add,
  AdminPanelSettings,
  Close,
  Collections,
  Explore,
  Home,
  Login,
  MovieCreation,
  Person, PersonAdd, PersonSearch,
  PowerSettingsNew,
  Whatshot
} from '@mui/icons-material';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { authActions, authSelectors } from '../../../auth/store';

interface ISubLeftMenuProps {
  onClose: () => void;
}

const SubLeftMenu = ({ onClose }: ISubLeftMenuProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleSignOut = (): void => {
    dispatch(authActions.signOut());
    onClose();
    navigate('/');
  };

  return (
    <>
      <Box
        sx={{
          width: 250,
        }}
        padding={2}>
        <Stack>
          <IconButton
            color='error'
            style={{ alignSelf: 'flex-end' }}
            size='large'
            onClick={onClose}>
            <AppIcon icon={Close} />
          </IconButton>
          <Divider orientation='vertical' />
          <List>
            {iconConfigs.map((config) => (
              <ListItemButton
                key={config.id}
                onClick={() => {
                  navigate(config.path);
                  onClose();
                }}>
                <ListItemIcon>{config.icon}</ListItemIcon>
                <ListItemText>{config.title}</ListItemText>
              </ListItemButton>
            ))}
            <Box className='actions'>
              <Divider />
              <ListItemButton onClick={() => handleNavigate('/search-user')}>
                <ListItemIcon>
                  <AppIcon icon={PersonSearch} color='#747df6' />
                </ListItemIcon>
                <ListItemText>Search user</ListItemText>
              </ListItemButton>
              <ListItemButton onClick={() => handleNavigate('/create-new-post')}>
                <ListItemIcon>
                  <AppIcon icon={Add} color='#44ff00' />
                </ListItemIcon>
                <ListItemText>Create new post</ListItemText>
              </ListItemButton>
              {currentUser?.isAdmin ? (
                <>
                  <ListItemButton onClick={() => handleNavigate('/admin-dashboard')}>
                    <ListItemIcon>
                      <AppIcon icon={AdminPanelSettings} color='#ff5b00' />
                    </ListItemIcon>
                    <ListItemText>Admin</ListItemText>
                  </ListItemButton>
                </>
              ) : null}
              {currentUser ? (
                <>
                  <ListItemButton onClick={() => handleNavigate(`/profile/${currentUser?.id}`)}>
                    <ListItemIcon>
                      <AppIcon icon={Person} color='#0288d1' />
                    </ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                  </ListItemButton>
                  <ListItemButton onClick={handleSignOut}>
                    <ListItemIcon>
                      <AppIcon icon={PowerSettingsNew} color='#e60023' />
                    </ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                  </ListItemButton>
                </>
              ) : (
                <>
                  <ListItemButton onClick={() => handleNavigate('/sign-in')}>
                    <ListItemIcon>
                      <AppIcon icon={Login} />
                    </ListItemIcon>
                    <ListItemText>Sin in</ListItemText>
                  </ListItemButton>
                  <ListItemButton onClick={() => handleNavigate('/sign-up')}>
                    <ListItemIcon>
                      <AppIcon icon={PersonAdd} />
                    </ListItemIcon>
                    <ListItemText>Sign up</ListItemText>
                  </ListItemButton>
                </>
              )}
            </Box>
          </List>
        </Stack>
      </Box>
    </>
  );
};

const iconConfigs = [
  {
    id: 'landing_page',
    title: 'Home',
    icon: <AppIcon icon={Home} color='#44ff00' />,
    path: '/',
  },
  {
    id: 'home_tab',
    title: 'Collections',
    icon: <AppIcon icon={Collections} color='#472183' />,
    path: '/home',
  },
  {
    id: 'shorts_tab',
    title: 'Shorts',
    icon: <AppIcon icon={MovieCreation} />,
    path: '/shorts',
  },
  {
    id: 'hot_tab',
    title: 'Trending!',
    icon: <AppIcon icon={Whatshot} color='#ff5b00' />,
    path: '/hots',
  },
  {
    id: 'explore',
    title: 'Explore',
    icon: <AppIcon icon={Explore} color='#0288d1' />,
    path: '/explore',
  },
];

export default SubLeftMenu;
