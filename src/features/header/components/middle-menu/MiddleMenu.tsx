import { AddReaction, Explore, Home, KeyboardArrowDown, MovieCreation, Whatshot } from '@mui/icons-material';
import { Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { SubMiddleMenu } from '../sub-middle-menu';
import styles from './styles.module.scss';
import SweetAlert from 'sweetalert2';

const MiddleMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isSubMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  const showSubMiddleMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

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
            <ListItemButton key={config.id} className={styles.menu__item} onClick={() => handleListItemClick(config)}>
              <ListItemIcon>{config.icon}</ListItemIcon>
              <ListItemText>{config.title}</ListItemText>
            </ListItemButton>
          ))}
          <ListItemButton className={styles['menu__item--icon']}>
            <IconButton color='secondary' size='large' onClick={showSubMiddleMenu}>
              <KeyboardArrowDown
                sx={{ transform: anchorEl ? 'rotate(180deg)' : 'rotate(0)', transition: 'all .2s ease' }}
              />
            </IconButton>
          </ListItemButton>
        </List>
        <SubMiddleMenu anchorEl={anchorEl} isOpen={isSubMenuOpen} onClose={() => setAnchorEl(null)} />
      </Box>
    </>
  );
};

const configs = [
  {
    id: 'home_tab',
    title: 'Home',
    icon: <AppIcon icon={Home} color='#44ff00' />,
    path: '/',
  },
  {
    id: 'shorts_tab',
    title: 'Shorts',
    icon: <AppIcon icon={MovieCreation} />,
    path: '/shorts',
  },
  {
    id: 'reactions',
    title: 'Reactions',
    icon: <AppIcon icon={AddReaction} color='#fbe44b' />,
    path: '/reactions',
  },
  {
    id: 'hot_tab',
    title: 'Hot!',
    icon: <AppIcon icon={Whatshot} color='#ff5b00' />,
    path: '/hots',
    isComingSoon: true,
  },
  {
    id: 'explore',
    title: 'Explore',
    icon: <AppIcon icon={Explore} color='#0288d1' />,
    path: '/explore',
    isComingSoon: true,
  },
];

export default MiddleMenu;
