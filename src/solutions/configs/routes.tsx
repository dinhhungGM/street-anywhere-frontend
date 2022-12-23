import { lazy, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

const LazyLandingPage = lazy(() =>
  import('../../features/landing-page').then((m) => ({ default: m.LandingPage })),
);
const LazySignUp = lazy(() =>
  import('../../features/auth/sign-up').then((m) => ({ default: m.SignUp })),
);
const LazyCreateNewPost = lazy(() =>
  import('./../../features/posts/create-new-post-v2').then((m) => ({ default: m.CreateNewPostV2 })),
);
const LazyPostDetail = lazy(() =>
  import('./../../features/posts/post-detail').then((m) => ({ default: m.PostDetail })),
);
const LazySignIn = lazy(() =>
  import('./../../features/auth/sign-in').then((m) => ({ default: m.SignIn })),
);
const LazyPageNotFound = lazy(() =>
  import('./../../solutions/components/app-page-not-found').then((m) => ({
    default: m.AppPageNotFound,
  })),
);
const LazyShorts = lazy(() =>
  import('./../../features/shorts').then((m) => ({ default: m.Shorts })),
);
const LazyReactions = lazy(() =>
  import('./../../features/reactions').then((m) => ({ default: m.Reactions })),
);
const LazyHots = lazy(() => import('./../../features/hots').then((m) => ({ default: m.Hots })));
const LazyExplore = lazy(() =>
  import('./../../features/explore').then((m) => ({ default: m.Explore })),
);
const LazyAdminDashboard = lazy(() =>
  import('./../../features/admin-dashboard').then((m) => ({ default: m.AdminDashboard })),
);
const LazyDashboardHome = lazy(() =>
  import('./../../features/admin-dashboard/components/dashboard-home').then((m) => ({
    default: m.DashboardHome,
  })),
);
const LazyUserManagement = lazy(() =>
  import('./../../features/admin-dashboard/components/user-management').then((m) => ({
    default: m.UserManagement,
  })),
);
const LazyCategoriesManagement = lazy(() =>
  import('./../../features/admin-dashboard/components/categories-management').then((m) => ({
    default: m.CategoriesManagement,
  })),
);
const LazyHashTagsManagement = lazy(() =>
  import('./../../features/admin-dashboard/components/hashtags-management').then((m) => ({
    default: m.HashTagsManagement,
  })),
);
const LazyReactionsManagement = lazy(() =>
  import('./../../features/admin-dashboard/components/reactions-management').then((m) => ({
    default: m.ReactionsManagement,
  })),
);
const LazyRoleManagement = lazy(() =>
  import('./../../features/admin-dashboard/components/role-management').then((m) => ({
    default: m.RoleManagement,
  })),
);
const LazyProfileDashBoard = lazy(() =>
  import('../../features/profile-dashboard').then((m) => ({ default: m.ProfileDashboard })),
);

const LazyWelcomeDashboard = lazy(() =>
  import('../../features/welcome-dashboard').then((m) => ({ default: m.WelcomeDashboard })),
);

const LazyProfileUpdatePost = lazy(() =>
  import('./../../features/profile-dashboard/profile-update-post').then((m) => ({
    default: m.ProfileUpdatePost,
  })),
);

const LazyProfilePersonalInfo = lazy(() =>
  import('./../../features/profile-dashboard/profile-personal-info').then((m) => ({
    default: m.ProfilePersonalInfo,
  })),
);

const LazyProfileListFollowers = lazy(() =>
  import('./../../features/profile-dashboard/profile-list-followers').then((m) => ({
    default: m.ProfileListFollowers,
  })),
);

const LazyProfileMyPosts = lazy(() =>
  import('./../../features/profile-dashboard/profile-list-posts').then((m) => ({
    default: m.ProfileListPosts,
  })),
);

const LazySearchUser = lazy(() =>
  import('./../../features/user/search-user').then((m) => ({ default: m.SearchUser })),
);

const LazyPostsManagement = lazy(() =>
  import('./../../features/admin-dashboard/components/posts-management').then((m) => ({
    default: m.PostsManagement,
  })),
);

type Route = {
  id: string;
  path: string;
  element: ReactNode;
  children?: Route[];
};

const routes: Route[] = [
  {
    id: 'welcome-page',
    path: '/',
    element: <LazyWelcomeDashboard />,
  },
  {
    id: 'home',
    path: '/home',
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
    path: '/profile/:userId',
    element: <LazyProfileDashBoard />,
    children: [
      {
        id: 'profile/followers',
        path: 'followers',
        element: <LazyProfileListFollowers />,
      },
      {
        id: 'profile/my-post',
        path: 'posts',
        element: <LazyProfileMyPosts />,
      },
      {
        id: 'profile/info',
        path: '',
        element: <LazyProfilePersonalInfo />,
      },
      {
        id: 'profile/not-found',
        path: '*',
        element: <Navigate to='/404' />,
      },
    ],
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
    children: [
      {
        id: 'admin-dashboard/users',
        path: 'users',
        element: <LazyUserManagement />,
      },
      {
        id: 'admin-dashboard/roles',
        path: 'roles',
        element: <LazyRoleManagement />,
      },
      {
        id: 'admin-dashboard/reactions',
        path: 'reactions',
        element: <LazyReactionsManagement />,
      },
      {
        id: 'admin-dashboard/categories',
        path: 'categories',
        element: <LazyCategoriesManagement />,
      },
      {
        id: 'admin-dashboard/hash-tags',
        path: 'hash-tags',
        element: <LazyHashTagsManagement />,
      },
      {
        id: 'admin-dashboard/posts',
        path: 'posts',
        element: <LazyPostsManagement />,
      },
      {
        id: 'admin-dashboard/home',
        path: '',
        element: <LazyDashboardHome />,
      },
    ],
  },
  {
    id: 'profile-update-post',
    path: '/profile/:userId/update-post/:postId',
    element: <LazyProfileUpdatePost />,
  },
  {
    id: 'search-user',
    path: '/search-user',
    element: <LazySearchUser />,
  },
  {
    id: 'page-not-found',
    path: '/404',
    element: <LazyPageNotFound />,
  },
  {
    id: 'match-all-route',
    path: '*',
    element: <Navigate to='/404' replace />,
  },
];

export default routes;
