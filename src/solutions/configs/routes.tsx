import { lazy } from 'react';

const LazyLandingPage = lazy(() => import('../../features/landing-page').then((m) => ({ default: m.LandingPage })));
const LazySignUp = lazy(() => import('./../../features/sign-up').then((m) => ({ default: m.SignUp })));

const routes = [
  {
    id: 'home',
    path: '/',
    element: <LazyLandingPage />,
  },
  {
    id: 'sign-up',
    path: '/sign-up',
    element: <LazySignUp />,
  },
];

export default routes;
