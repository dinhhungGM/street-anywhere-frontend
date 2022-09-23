import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import AppMap from '../app-map/AppMap';

type AppMapPopupProps = {
  isOpen: boolean;
  currentLongitude?: number | null | undefined;
  currentLatitude?: number | null | undefined;
  zoom?: number | null | undefined;
  onClose: () => void;
  onSelect: (locationInfo: any) => void;
};

const AppMapPopup = ({ isOpen, onClose, onSelect, currentLatitude, currentLongitude, zoom }: AppMapPopupProps) => {
  const [marker, setMarker] = useState<any>(null);
  const [queryAddress, setQueryAddress] = useState(null);

  const handleOnSelectLocationPoint = (e: any) => {
    const { lng, lat } = e.lngLat;
    setMarker({
      longitude: lng,
      latitude: lat,
    });
  };

  const handleOnFindLocation = (e): void => {
    const [longitude, latitude] = e.result.geometry.coordinates;
    const location = e.result.place_name;
    setQueryAddress({
      longitude,
      latitude,
      location,
    });
  };

  const handleOnFigureOutCurrentPosition = (e) => {
    setTimeout(() => {
      const { latitude, longitude } = e.target._lastKnownPosition.coords;
      setQueryAddress({ latitude, longitude, location: '' });
    }, 1000);
  };

  const handleOnClickSelectBtn = (): void => {
    onSelect(marker || queryAddress);
  };

  useEffect(() => {
    return () => {
      setMarker(null);
    };
  }, [isOpen]);

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
          <AppMap
            latitude={currentLatitude}
            zoom={zoom}
            longitude={currentLongitude}
            marker={marker}
            onSelectLocationPoint={handleOnSelectLocationPoint}
            onFindLocation={handleOnFindLocation}
            onFigureOutCurrentPosition={handleOnFigureOutCurrentPosition}
          />
        </DialogContent>
        <DialogActions>
          <Stack spacing={2} direction='row' padding={2}>
            <Button variant='contained' color='error' onClick={onClose}>
              Cancel
            </Button>
            <Button variant='contained' onClick={handleOnClickSelectBtn}>
              Select
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AppMapPopup;
