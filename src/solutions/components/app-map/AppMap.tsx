import { Room } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import Map, { GeolocateControl, Marker, useControl } from 'react-map-gl';
import { AppIcon } from '../app-icon';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Stack } from '@mui/material';

type AppMapProps = {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  markers?: any[];
  marker: any;
  onClick: (e: any) => void;
};

function GeocoderControl(props: any) {
  useControl(() => new MapboxGeocoder(props));
  return null;
}

const AppMap = ({ latitude = 14.058324, longitude = 108.277199, zoom = 5.5, onClick, marker }: AppMapProps) => {
  const [viewportState, setViewportState] = useState({
    longitude,
    latitude,
  });

  useEffect(() => {}, []);

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
          <Marker anchor='left' latitude={marker.latitude} longitude={marker.longitude}>
            <AppIcon component={Room} color='#e60023' fontSize={32} />
          </Marker>
        )}
        <Stack direction='row'>
          <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
          <GeocoderControl accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} />
        </Stack>
      </Map>
    </>
  );
};

export default AppMap;
