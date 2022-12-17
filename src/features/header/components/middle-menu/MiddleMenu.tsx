import { Collections, Explore, Home, MovieCreation, Whatshot } from '@mui/icons-material';
import { Box, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { AppIcon } from '../../../../solutions/components/app-icon';
import styles from './styles.module.scss';
import cx from 'classnames';

const MiddleMenu = () => {
  return (
    <>
      <Box>
        <List className={styles.menu}>
          {configs.map((config) => (
            <ListItemButton key={config.id} className={styles.menu__btn}>
              <NavLink
                to={config.path}
                className={(navData) =>
                  navData.isActive
                    ? cx(styles.menu__item, styles.menu__item__active)
                    : styles.menu__item
                }>
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
