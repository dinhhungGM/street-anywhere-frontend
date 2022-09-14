import Map from 'react-map-gl';

const AppMap = () => {
  return (
    <>
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle='mapbox://styles/mapbox/streets-v9'
      ></Map>
    </>
  );
};

export default AppMap;
