import { AddReaction, Category, Image, Newspaper, People, YouTube } from '@mui/icons-material';
import { IAppTableHeaderConfig } from '../../../../solutions/components/app-table';

export const topFollowersTableHeaderConfigs: IAppTableHeaderConfig[] = [
  {
    header: '#',
    isCenter: false,
  },
  {
    header: 'Avatar',
    isCenter: false,
  },
  {
    header: 'Name',
    isCenter: false,
  },
  {
    header: 'Number of followers',
    isCenter: false,
  },
];

export const topFollowersTableRowConfigs = [
  {
    field: 'id',
    isCenter: false,
  },
  {
    field: 'profilePhotoUrl',
    isCenter: true,
    isAvatar: true,
  },
  {
    field: 'fullName',
    isCenter: false,
  },
  {
    field: 'totalFollower',
    isCenter: true,
  },
];

export const topPostsTableHeaderConfigs: IAppTableHeaderConfig[] = [
  {
    header: '#',
    isCenter: false,
  },
  {
    header: 'Avatar',
    isCenter: false,
  },
  {
    header: 'Name',
    isCenter: false,
  },
  {
    header: 'Number of posts',
    isCenter: false,
  },
];

export const topPostsTableRowConfigs = [
  {
    field: 'id',
    isCenter: false,
  },
  {
    field: 'profilePhotoUrl',
    isCenter: true,
    isAvatar: true,
  },
  {
    field: 'fullName',
    isCenter: false,
  },
  {
    field: 'totalPost',
    isCenter: true,
  },
];

export const widgetConfigs = [
  {
    id: 'totalUsers',
    mappingValue: 'totalUsers',
    icon: People,
    title: 'Users',
  },
  {
    id: 'totalPosts',
    mappingValue: 'totalPosts',
    icon: Newspaper,
    title: 'Posts',
  },
  {
    id: 'totalImages',
    mappingValue: 'totalImages',
    icon: Image,
    title: 'Image Posts',
  },
  {
    id: 'totalVideos',
    mappingValue: 'totalVideos',
    icon: YouTube,
    title: 'Video Posts',
  },
  {
    id: 'totalReactionIcons',
    mappingValue: 'totalReactionIcons',
    icon: AddReaction,
    title: 'Reaction Icons',
  },
  {
    id: 'totalCategories',
    mappingValue: 'totalCategories',
    icon: Category,
    title: 'Categories',
  },
];
