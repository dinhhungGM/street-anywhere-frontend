import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { useState } from 'react';
import AppMap from '../app-map/AppMap';

type AppMapPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (locationInfo: any) => void;
};

const AppMapPopup = ({ isOpen, onClose, onSelect }: AppMapPopupProps) => {
  const [marker, setMarker] = useState<any>(undefined);
  const handleOnClick = (e: any) => {
    const { lng, lat } = e.lngLat;
    setMarker({
      longitude: lng,
      latitude: lat,
    });
  };

  const handleOnClose = (): void => {
    setMarker(null);
    onClose();
  };

  const handleOnSelect = (): void => {
    const locationInfo = {
      ...marker,
      location: 'Viet Name',
    };
    onSelect(locationInfo);
    onClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleOnClose}
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
            <Button variant='contained' color='error' onClick={handleOnClose}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleOnSelect}>
              Select
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppMapPopup;
