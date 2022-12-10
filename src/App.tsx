import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import './App.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ThemeProvider } from '@emotion/react';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { Wrapper } from './features/wrapper';
import LoadingSpinner from './solutions/components/loading-spinner/LoadingSpinner';
import routes from './solutions/configs/routes';
import { appTheme } from './solutions/configs/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={appTheme}>
        <Wrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {routes.map((route) => {
                if (route.children && route.children.length) {
                  return (
                    <Route key={route.id} path={route.path} element={route.element}>
                      {route.children.map((routeChild) => (
                        <Route key={routeChild.id} path={routeChild.path} element={routeChild.element} />
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
