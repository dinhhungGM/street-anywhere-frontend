import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Room } from '@mui/icons-material';
import mapboxgl from 'mapbox-gl';
import { useState } from 'react';
import Map, { GeolocateControl, Marker, useControl } from 'react-map-gl';
import { AppIcon } from '../app-icon';

type AppMapProps = {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  marker?: any;
  isReadonly?: boolean;
  onSelectLocationPoint?: (e: any) => void;
  onFindLocation?: (e) => void;
  onFigureOutCurrentPosition?: (e) => void;
};

function GeocoderControl(props: any) {
  useControl(() => new MapboxGeocoder(props).on('result', props.onResult));
  return null;
}

const AppMap = ({
  latitude = 14.058324,
  longitude = 108.277199,
  zoom = 5.5,
  marker,
  isReadonly = false,
  onSelectLocationPoint,
  onFindLocation,
  onFigureOutCurrentPosition,
}: AppMapProps) => {
  const [viewportState, setViewportState] = useState({
    longitude,
    latitude,
    zoom,
  });

  const flyToCenter = (e) => {
    const map = e.target;
    map.flyTo({
      center: [longitude, latitude],
    });
  };

  return (
    <>
      <Map
        {...viewportState}
        onMove={(evt) => setViewportState(evt.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{ width: '80vw', height: '75vh' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
        onClick={onSelectLocationPoint}
        onLoad={flyToCenter}
      >
        {marker && (
          <Marker anchor='left' latitude={marker.latitude} longitude={marker.longitude}>
            <AppIcon component={Room} color='#e60023' fontSize={32} />
          </Marker>
        )}
        {!isReadonly && (
          <>
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              onTrackUserLocationStart={onFigureOutCurrentPosition}
            />
            <GeocoderControl
              accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              mapboxgl={mapboxgl}
              onResult={onFindLocation}
            />
          </>
        )}
      </Map>
    </>
  );
};

export default AppMap;
