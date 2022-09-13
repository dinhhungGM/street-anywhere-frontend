import { Close, Group, Home, Image, LocalFireDepartment, Newspaper, Tag } from '@mui/icons-material';
import { Box, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import Icon from '../../../../solutions/components/app-icon/AppIcon';

interface ISubLeftMenuProps {
  onClose: () => void;
}

const SubLeftMenu = ({ onClose }: ISubLeftMenuProps) => {
  return (
    <>
      <Box
        sx={{
          width: 250,
        }}
        padding={2}
      >
        <Stack>
          <IconButton color='error' style={{ alignSelf: 'flex-end' }} size='large' onClick={onClose}>
            <Icon component={Close} />
          </IconButton>
          <Divider orientation='vertical' />
          <List>
            {iconConfigs.map((config) => (
              <ListItemButton key={config.id}>
                <ListItemIcon>{config.icon}</ListItemIcon>
                <ListItemText>{config.title}</ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Stack>
      </Box>
    </>
  );
};

const iconConfigs = [
  {
    id: 'home',
    icon: <Icon component={Home} color='#44ff00' />,
    title: 'Home',
  },
  {
    id: 'local_fire_department',
    icon: <Icon component={LocalFireDepartment} color='#ff5b00' />,
    title: 'Hots',
  },
  {
    id: 'newspaper',
    icon: <Icon component={Newspaper} color='#1d1d1f' />,
    title: 'Submit News',
  },
  {
    id: 'image',
    icon: <Icon component={Image} color='#747df6' />,
    title: 'Submit Image',
  },
  {
    id: 'tags',
    icon: <Icon component={Tag} color='#84849d' />,
    title: 'Tags',
  },
  {
    id: 'group',
    icon: <Icon component={Group} color='#eab171' />,
    title: 'Top Users',
  },
];

export default SubLeftMenu;
