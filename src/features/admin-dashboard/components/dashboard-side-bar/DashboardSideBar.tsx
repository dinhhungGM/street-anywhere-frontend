import {
  Avatar,
  Box,
  List,
  ListItemButton,
  Stack,
  Typography,
  ListItemIcon,
  ListItemText,
  Divider,
  ListItem,
} from '@mui/material';
import styles from './styles.module.scss';
import { IUser } from '../../../../solutions/models/authModels';
import { NavLink } from 'react-router-dom';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { Dashboard, People, PieChart, AddReaction, Category, Tag } from '@mui/icons-material';
import cx from 'classnames';

const sidebarConfigs = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: <AppIcon icon={PieChart} />,
    path: '/admin-dashboard',
  },
  {
    id: 'admin-dashboard/users',
    title: 'Users',
    icon: <AppIcon icon={People} />,
    path: '/admin-dashboard/users',
  },
  {
    id: 'admin-dashboard/reactions',
    title: 'Reactions',
    icon: <AppIcon icon={AddReaction} />,
    path: '/admin-dashboard/reactions',
  },
  {
    id: 'admin-dashboard/categories',
    title: 'Categories',
    icon: <AppIcon icon={Category} />,
    path: '/admin-dashboard/categories',
  },
  {
    id: 'admin-dashboard/tags',
    title: 'Hashtags',
    icon: <AppIcon icon={Tag} />,
    path: '/admin-dashboard/hash-tags',
  },
];

interface IDashboardSideBarProps {
  currentUser?: IUser;
}
const DashboardSideBar = ({ currentUser }: IDashboardSideBarProps) => {
  return (
    <>
      <Box className={styles.sidebar}>
        <Box className={styles.sidebar__logo}>
          <NavLink to='/admin-dashboard'>
            <img src='/logo.png' alt='Logo' />
          </NavLink>
        </Box>
        <Box className={styles.sidebar__user}>
          <Stack direction='row' spacing={2} alignItems='center' justifyContent='flex-start'>
            <Avatar src={currentUser.profilePhotoUrl} />
            <Typography fontWeight={600}>{currentUser.fullName}</Typography>
          </Stack>
        </Box>
        <Box className={styles.sidebar__nav}>
          <List>
            {sidebarConfigs.map((config) => (
              <ListItem key={config.id}>
                <NavLink
                  to={config.path}
                  className={({ isActive }) =>
                    cx(styles.sidebar__nav__link, isActive ? styles['sidebar__nav__link--active'] : null)
                  }
                  end
                >
                  <ListItemIcon>{config.icon}</ListItemIcon>
                  <ListItemText>{config.title}</ListItemText>
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default DashboardSideBar;
