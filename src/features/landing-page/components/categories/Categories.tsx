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
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { AppIcon } from '../../../../solutions/components/app-icon';

const Categories = () => {
  return (
    <>
      {' '}
      <>
        <Box
          sx={{
            backgroundColor: '#fff',
            padding: '12px',
            borderRadius: '16px',
          }}
        >
          <Typography variant='h4'>Categories</Typography>
          <List>
            {configs.map((config) => (
              <ListItem key={config.id} sx={{ borderBottom: '1px solid #f2f5f8' }}>
                <ListItemIcon>{config.icon}</ListItemIcon>
                <ListItemText>{config.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </>
    </>
  );
};

export const configs = [
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

export default Categories;
