import { AddReaction, Explore, Home, KeyboardArrowDown, MovieCreation, Whatshot } from '@mui/icons-material';
import { Box, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { SubMiddleMenu } from '../sub-middle-menu';
import styles from './styles.module.scss';

const MiddleMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isSubMenuOpen = Boolean(anchorEl);

  const showSubMiddleMenu = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <Box>
        <List className={styles.menu}>
          {configs.map((config) => (
            <ListItemButton key={config.id} className={styles.menu__item}>
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
    icon: <AppIcon component={Home} color='#44ff00' />,
  },
  {
    id: 'shorts_tab',
    title: 'Shorts',
    icon: <AppIcon component={MovieCreation} />,
  },
  {
    id: 'reactions',
    title: 'Reactions',
    icon: <AppIcon component={AddReaction} color='#fbe44b' />,
  },
  {
    id: 'hot_tab',
    title: 'Hot!',
    icon: <AppIcon component={Whatshot} color='#ff5b00' />,
  },
  {
    id: 'explore',
    title: 'Explore',
    icon: <AppIcon component={Explore} color='#0288d1' />,
  },
];

export default MiddleMenu;
