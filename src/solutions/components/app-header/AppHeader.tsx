import { Add, Close, Logout, Menu as MenuIcon, Notifications } from '@mui/icons-material';
import {
  Avatar, Badge,
  Box, Divider, IconButton, ListItemIcon, Menu,
  MenuItem, Tooltip,
  Typography
} from '@mui/material';
import cx from 'classnames';
import { MouseEvent, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { authActions, authSelectors } from '../../../features/auth/store';
import { AppIcon } from '../app-icon';
import { AppIconButton } from '../app-icon-button';
import styles from './styles.module.scss';

const AppHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (size.width > 768 && menuOpen) {
      setMenuOpen(false);
    }
  }, [size.width, menuOpen]);

  const menuToggleHandler = () => {
    setMenuOpen((p) => !p);
  };

  const isActive = ({ isActive }) => (isActive ? styles.active : styles.inactive);

  const signOut = () => {
    dispatch(authActions.signOut());
    navigate('/');
  };

  return (
    <>
      <Box component='header' className={styles.header}>
        <Box component='div' className={styles.header__content}>
          <Link to='/' className={styles.header__content__logo}>
            <img src='/logo.png' alt='Logo' />
            <Typography fontSize={28} fontFamily='fantasy' color='yellow'>
              Street Anywhere
            </Typography>
          </Link>
          <nav className={cx(styles.header__content__nav, menuOpen && size.width < 768 ? styles.isMenu : '')}>
            <ul>
              <li>
                <NavLink to='/' className={isActive}>
                  Feeds
                </NavLink>
              </li>
              <li>
                <NavLink to='/shorts' className={isActive}>
                  Shorts
                </NavLink>
              </li>
              <li>
                <NavLink to='/explore' className={isActive}>
                  Explore
                </NavLink>
              </li>
              {currentUser ? (
                <>
                  {currentUser?.isAdmin && (
                    <li>
                      <NavLink to='/admin-dashboard' className={isActive}>
                        Admin
                      </NavLink>
                    </li>
                  )}
                  <li>
                    <IconButton onClick={handleClick}>
                      <Avatar src={currentUser?.profilePhotoUrl}>{currentUser?.fullName[0]}</Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      id='account-menu'
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                      <MenuItem>
                        <Avatar src={currentUser?.profilePhotoUrl} /> Profile
                      </MenuItem>
                      <Divider />
                      <MenuItem onClick={() => navigate('/create-new-post')}>
                        <ListItemIcon>
                          <Add fontSize='small' />
                        </ListItemIcon>
                        New feed
                      </MenuItem>
                      <MenuItem onClick={signOut}>
                        <ListItemIcon>
                          <Logout fontSize='small' />
                        </ListItemIcon>
                        Sign out
                      </MenuItem>
                    </Menu>
                  </li>
                  <li>
                    <Tooltip title='Notification'>
                      <IconButton size='large' color='primary'>
                        <Badge color='error' badgeContent={1} max={99}>
                          <AppIcon icon={Notifications} color='#fbe44b' />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink to='/sign-in' className={isActive}>
                      Sign in
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/sign-up' className={isActive}>
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className={styles.header__content__toggle}>
            {!menuOpen ? (
              <AppIconButton icon={<AppIcon icon={MenuIcon} color='#fff' />} onClick={menuToggleHandler} />
            ) : (
              <AppIconButton icon={<AppIcon icon={Close} color='#fff' />} onClick={menuToggleHandler} />
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};

export default AppHeader;
