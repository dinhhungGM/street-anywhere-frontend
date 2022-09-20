import { lazy, ReactNode } from 'react';

const LazyLandingPage = lazy(() => import('../../features/landing-page').then((m) => ({ default: m.LandingPage })));
const LazySignUp = lazy(() => import('../../features/auth/sign-up').then((m) => ({ default: m.SignUp })));
const LazyCreateNewPost = lazy(() =>
  import('./../../features/posts/create-new-post').then((m) => ({ default: m.CreateNewPost })),
);
const LazyPostDetail = lazy(() =>
  import('./../../features/posts/post-detail').then((m) => ({ default: m.PostDetail })),
);
const LazySignIn = lazy(() => import('./../../features/auth/sign-in').then((m) => ({ default: m.SignIn })));
const LazyPageNotFound = lazy(() =>
  import('./../../solutions/components/app-page-not-found').then((m) => ({ default: m.AppPageNotFound })),
);

type Route = {
  id: string;
  path: string;
  element: ReactNode;
};

const routes: Route[] = [
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
  {
    id: 'sign-in',
    path: '/sign-in',
    element: <LazySignIn />,
  },
  {
    id: 'create-new-post',
    path: '/create-new-post',
    element: <LazyCreateNewPost />,
  },
  {
    id: 'post-detail',
    path: '/posts/:postId',
    element: <LazyPostDetail />,
  },
  {
    id: 'page-not-found',
    path: '*',
    element: <LazyPageNotFound />,
  },
];

export default routes;
