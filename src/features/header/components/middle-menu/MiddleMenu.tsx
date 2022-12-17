import { Collections, Explore, Home, MovieCreation, Whatshot } from '@mui/icons-material';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { AppIcon } from '../../../../solutions/components/app-icon';
import styles from './styles.module.scss';

const MiddleMenu = () => {
  const navigate = useNavigate();

  const handleListItemClick = (config) => {
    if (config.isComingSoon) {
      SweetAlert.fire({
        title: 'Info',
        icon: 'info',
        text: 'Coming soon',
      });
    } else {
      navigate(config.path);
    }
  };

  return (
    <>
      <Box>
        <List className={styles.menu}>
          {configs.map((config) => (
            <ListItemButton key={config.id} onClick={() => handleListItemClick(config)}>
              <NavLink to='/' className={styles.menu__item}>
                <ListItemIcon>{config.icon}</ListItemIcon>
                <ListItemText>{config.title}</ListItemText>
              </NavLink>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </>
  );
};

const configs = [
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

export default MiddleMenu;
