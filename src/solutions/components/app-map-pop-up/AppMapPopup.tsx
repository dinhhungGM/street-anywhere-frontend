import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField } from '@mui/material';
import AppMap from '../app-map/AppMap';
import styles from './styles.module.scss';
import { useState } from 'react';

type AppMapPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: () => void;
};

const AppMapPopup = ({ isOpen, onClose }: AppMapPopupProps) => {
  const [marker, setMarker] = useState<any>(undefined);
  const handleOnClick = (e: any) => {
    const { lng, lat } = e.lngLat;
    setMarker({
      long: lng,
      lat,
    });
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={onClose}
        aria-labelledby='dialog-title'
        aria-describedby='alert-dialog-description'
        maxWidth='lg'
        sx={{
          overflowY: 'unset',
        }}
      >
        <DialogTitle id='dialog-title'>Map</DialogTitle>
        <DialogContent
          sx={{
            overflow: 'unset',
          }}
        >
          <AppMap marker={marker} onClick={handleOnClick} />
        </DialogContent>
        <DialogActions>
          <Stack spacing={2} direction='row' padding={2}>
            <Button variant='contained' color='error' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='contained'>Select</Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppMapPopup;
