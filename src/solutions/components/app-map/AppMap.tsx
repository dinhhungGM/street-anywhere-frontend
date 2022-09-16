import { Room } from '@mui/icons-material';
import { useState } from 'react';
import Map, { Popup, Marker } from 'react-map-gl';
import { AppIcon } from '../app-icon';

type AppMapProps = {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  markers?: any[];
  marker: any;
  onClick: (e: any) => void;
};

const AppMap = ({ latitude = 14.058324, longitude = 108.277199, zoom = 5.5, onClick, marker }: AppMapProps) => {
  const [viewportState, setViewportState] = useState({
    longitude,
    latitude,
    zoom: 10,
  });
  return (
    <>
      <Map
        {...viewportState}
        onMove={(evt) => setViewportState(evt.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{ width: '80vw', height: '75vh' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        onClick={onClick}
      >
        {marker && (
          <Marker anchor='left' latitude={marker.lat} longitude={marker.long}>
            <AppIcon component={Room} color='#e60023' fontSize={32} />
          </Marker>
        )}
      </Map>
    </>
  );
};

export default AppMap;
