import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import './App.css';
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
              {routes.map((route) => (
                <Route key={route.id} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </Wrapper>
      </ThemeProvider>
    </>
  );
}

export default App;
