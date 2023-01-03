import { ThemeProvider } from '@emotion/react';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { Box, CircularProgress } from '@mui/material';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './App.css';
import { Wrapper } from './features/wrapper';
import routes from './solutions/configs/routes';
import { appTheme } from './solutions/configs/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Wrapper>
          <Suspense
            fallback={
              <Box className='fallback'>
                <CircularProgress color='primary' />
              </Box>
            }>
            <Routes>
              {routes.map((route) => {
                if (route.children && route.children.length) {
                  return (
                    <Route key={route.id} path={route.path} element={route.element}>
                      {route.children.map((routeChild) => (
                        <Route
                          key={routeChild.id}
                          path={routeChild.path}
                          element={routeChild.element}
                        />
                      ))}
                    </Route>
                  );
                }
                return <Route key={route.id} path={route.path} element={route.element} />;
              })}
            </Routes>
          </Suspense>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
