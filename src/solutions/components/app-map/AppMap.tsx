import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { Room } from '@mui/icons-material';
import mapboxgl from 'mapbox-gl';
import { useCallback, useRef, useState } from 'react';
import Map, { GeolocateControl, Marker } from 'react-map-gl';
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
  const geoLocateControlRef = useCallback((ref) => {
    if (ref) {
      ref.trigger();
    }
  }, []);

  const handleOnLoadMap = (e): void => {
    const map = e.target as mapboxgl.Map;
    if (!isReadonly) {
      map.addControl(
        new MapboxGeocoder({
          accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
          mapboxgl,
        }).on('result', onFindLocation),
      );
    }
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
        onLoad={handleOnLoadMap}
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
              ref={geoLocateControlRef}
            />
          </>
        )}
      </Map>
    </>
  );
};

export default AppMap;
