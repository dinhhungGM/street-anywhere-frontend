import { List, ListItem, ListItemText } from '@mui/material';
import styles from './styles.module.scss';
import Typography from '@mui/material/Typography';

const Discover = () => {
  return (
    <>
      <Typography variant='h5'>Discover</Typography>
      <List>
        {configs.map((config) => (
          <ListItem key={config.id} className={styles['list-item']}>
            <ListItemText>{config.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const configs = [
  {
    id: 'video',
    title: 'Video',
  },
  {
    id: 'music',
    title: 'Music',
  },
  {
    id: 'art',
    title: 'Art',
  },
  {
    id: 'vimeo',
    title: 'Vimeo',
  },
  {
    id: 'instagram',
    title: 'Instagram',
  },
];

export default Discover;
