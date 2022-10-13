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
const LazyProfile = lazy(() => import('./../../features/profile').then((m) => ({ default: m.Profile })));
const LazyShorts = lazy(() => import('./../../features/shorts').then((m) => ({ default: m.Shorts })));
const LazyReactions = lazy(() => import('./../../features/reactions').then((m) => ({ default: m.Reactions })));
const LazyHots = lazy(() => import('./../../features/hots').then((m) => ({ default: m.Hots })));
const LazyExplore = lazy(() => import('./../../features/explore').then((m) => ({ default: m.Explore })));
const LazyAdminDashboard = lazy(() =>
  import('./../../features/admin-dashboard').then((m) => ({ default: m.AdminDashboard })),
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
    id: 'profile',
    path: '/profile',
    element: <LazyProfile />,
  },
  {
    id: 'shorts',
    path: '/shorts',
    element: <LazyShorts />,
  },
  {
    id: 'reactions',
    path: '/reactions',
    element: <LazyReactions />,
  },
  {
    id: 'hots',
    path: '/hots',
    element: <LazyHots />,
  },
  {
    id: 'explore',
    path: '/explore',
    element: <LazyExplore />,
  },
  {
    id: 'admin-dashboard',
    path: '/admin-dashboard',
    element: <LazyAdminDashboard />,
  },
  {
    id: 'page-not-found',
    path: '*',
    element: <LazyPageNotFound />,
  },
];

export default routes;
