import {
  Close,
  FormatAlignJustify,
  FormatAlignLeft,
  Headphones,
  Image,
  Newspaper,
  VideoCall,
} from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { AppIcon } from '../../../solutions/components/app-icon';
import styles from './styles.module.scss';

type IFunctionsMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  anchorEl: HTMLElement | null;
};

const FeatureMenu = ({ isOpen, onClose, anchorEl }: IFunctionsMenuProps) => {
  return (
    <>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className={styles.menu}
        PaperProps={{
          style: {
            width: 280,
            padding: 12,
            borderRadius: 12,
          },
        }}
      >
        {configs.map((config, idx) => (
          <NavLink key={config.id} to='/posts/create-new-post'>
            <MenuItem onClick={onClose} className={styles['menu__item']}>
              <AppIcon component={config.icon} color={config.color} />
              <span className={styles['menu__item__title']}>{config.title}</span>
            </MenuItem>
          </NavLink>
        ))}
      </Menu>
    </>
  );
};

export const configs = [
  { id: 'newspaper', title: 'News', icon: Newspaper, color: '#1d1d1f' },
  { id: 'image', title: 'Image', icon: Image, color: '#0288d1' },
  { id: 'video_call', title: 'Video', icon: VideoCall, color: '#e60023' },
  { id: 'format_align_left', title: 'Poll', icon: FormatAlignLeft, color: '#84849d' },
  { id: 'format_align_justify', title: 'List', icon: FormatAlignJustify, color: '#84849d' },
  { id: 'close', title: 'Trivia Quiz', icon: Close, color: '#747df6' },
  { id: 'headphones', title: 'Music', icon: Headphones, color: '#1d1d1f' },
];

export default FeatureMenu;