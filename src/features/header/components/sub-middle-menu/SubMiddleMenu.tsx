import {
  CameraIndoor,
  ColorLens,
  Headphones,
  Help,
  Map,
  Memory,
  Museum,
  Park,
  Public,
  SportsSoccer,
  VideogameAsset,
} from '@mui/icons-material';
import { Box, Menu, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AppIcon } from '../../../../solutions/components/app-icon';
import styles from './styles.module.scss';

type SubMiddleMenuProps = {
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
};

const SubMiddleMenu = ({ anchorEl, isOpen, onClose }: SubMiddleMenuProps) => {
  return (
    <>
      <Menu
        id='basic-middle-menu'
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          style: {
            width: '100vw',
            padding: '12px 36px',
            borderRadius: 28,
          },
        }}
      >
        <Stack direction='row' spacing={8} alignItems='center' justifyContent='center' flexWrap='wrap' rowGap={2}>
          {configs.map((config) => (
            <Box key={config.id} className={styles.item}>
              {config.icon}
              <Typography paddingTop={1}>{config.title}</Typography>
            </Box>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

const configs = [
  {
    id: 'art',
    title: 'Art',
    icon: <AppIcon component={ColorLens} color='#747df6' />,
  },
  {
    id: 'entertainment',
    title: 'Entertainment',
    icon: <AppIcon component={CameraIndoor} color='#9391fd' />,
  },
  {
    id: 'game',
    title: 'Game',
    icon: <AppIcon component={VideogameAsset} color='#44ff00' />,
  },
  {
    id: 'History',
    title: 'History',
    icon: <AppIcon component={Museum} color='#eab171' />,
  },
  {
    id: 'Help',
    title: 'Help',
    icon: <AppIcon component={Help} color='#fbe44b' />,
  },
  {
    id: 'internet',
    title: 'Internet',
    icon: <AppIcon component={Public} color='#9391fd' />,
  },
  {
    id: 'Music',
    title: 'Music',
    icon: <AppIcon component={Headphones} color='#44ff00' />,
  },
  {
    id: 'Nature',
    title: 'Nature',
    icon: <AppIcon component={Park} color='#44ff00' />,
  },
  {
    id: 'Sports',
    title: 'Sports',
    icon: <AppIcon component={SportsSoccer} color='#f92bfd' />,
  },
  {
    id: 'Technology',
    title: 'Technology',
    icon: <AppIcon component={Memory} color='#1d1d1f' />,
  },
  {
    id: 'Travel',
    title: 'Travel',
    icon: <AppIcon component={Map} color='#e60023' />,
  },
];

export default SubMiddleMenu;
