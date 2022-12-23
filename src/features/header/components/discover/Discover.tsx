import { Delete, History } from '@mui/icons-material';
import { Button, List, ListItemButton, ListItemIcon, ListItemText, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AppIcon } from '../../../../solutions/components/app-icon';
import styles from './styles.module.scss';

interface IDiscoverProps {
  savedKeys?: string[];
  onClickOnKey?: any;
  onClearAll?: any;
  onDeleteKey?: any;
}
const Discover = ({ savedKeys, onClickOnKey, onClearAll, onDeleteKey }: IDiscoverProps) => {
  const handleOnClick = (key) => {
    onClickOnKey(key);
  };

  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
        <Stack direction='row' alignItems='center' spacing={2} marginTop={1}>
          <AppIcon icon={History} fontSize={28} />
          <Typography variant='h5'>Search history</Typography>
        </Stack>
        {savedKeys.length ? (
          <Button variant='contained' color='error' onClick={onClearAll}>
            Clear all
          </Button>
        ) : null}
      </Stack>
      <List className={styles.list}>
        {savedKeys.map((key, idx) => (
          <ListItemButton
            key={idx}
            className={styles['list-item']}
            onClick={() => handleOnClick(key)}>
            <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%'>
              <ListItemText>{key}</ListItemText>
              <ListItemIcon
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteKey(key);
                }}>
                <AppIcon icon={Delete} />
              </ListItemIcon>
            </Stack>
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default Discover;
