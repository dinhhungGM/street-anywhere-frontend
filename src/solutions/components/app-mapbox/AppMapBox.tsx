import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import { Box } from '@mui/material';
import mapboxgl, { Marker, Popup } from 'mapbox-gl';
import React, { useEffect, useRef } from 'react';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

interface IAppMapBox {
  baseLong?: number;
  baseLat?: number;
  baseZoom?: number;
  mapWidth?: string;
  language?: string;
  mapHeight?: string;
  isTracing?: boolean;
  address?: string;
  isDisplayGeoDirection?: boolean;
  desPoint?: { long: number; lat: number; };
  sourcePoint?: { long: number; lat: number; };
  onClickOnMap?: (e) => any;
  onSearchOnMap?: (e) => any;
}
const AppMapBox = ({
  baseZoom = 5.5,
  address = null,
  language = 'en',
  desPoint = null,
  mapWidth = '100%',
  isTracing = false,
  mapHeight = '600px',
  sourcePoint = null,
  baseLat = 14.058324,
  baseLong = 108.277199,
  isDisplayGeoDirection = false,
  onClickOnMap = (e) => {},
  onSearchOnMap = (e) => {},
}: IAppMapBox) => {
  const mapRef = useRef();
  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapRef.current,
      center: desPoint ? [desPoint.long, desPoint.lat] : [baseLong, baseLat],
      zoom: baseZoom,
      accessToken: mapboxgl.accessToken,
      style: 'mapbox://styles/mapbox/streets-v11',
    });

    // Create control
    const mapboxDirections = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling',
    });
    const mapboxGeocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });
    const mapboxFullScreenControl = new mapboxgl.FullscreenControl();
    const mapboxGeolocatieControl = new mapboxgl.GeolocateControl();
    const mapboxLanguage = new MapboxLanguage({
      defaultLanguage: language,
    });

    // Init event
    map.on('load', function () {
      let sourceMarker = new Marker();
      let desMarker = new Marker();
      const desPopup = new Popup({ offset: 25 });
      if (sourcePoint) {
        sourceMarker.setLngLat([sourcePoint.long, sourcePoint.lat]).addTo(this);
      }
      if (desPoint) {
        if (address) {
          desPopup.setText(address);
          desMarker.setPopup(desPopup);
        }
        desMarker.setLngLat([desPoint.long, desPoint.lat]);
        desMarker.addTo(this);
      }
    });
    map.on('click', onClickOnMap);
    mapboxGeocoder.on('result', onSearchOnMap);

    // Add control
    isDisplayGeoDirection && map.addControl(mapboxDirections, 'top-left');
    map.addControl(mapboxGeocoder);
    map.addControl(mapboxFullScreenControl);
    map.addControl(mapboxGeolocatieControl);
    map.addControl(mapboxLanguage);
  }, []);

  return (
    <>
      <Box paddingY={2}>
        <div
          ref={mapRef}
          style={{
            width: mapWidth,
            height: mapHeight,
            borderRadius: 8,
          }}></div>
      </Box>
    </>
  );
};

export default React.memo(AppMapBox);
