import { IAppTableHeaderConfig } from '../../../../solutions/components/app-table';
import { IAppTableRowConfig } from '../../../../solutions/components/app-table/index';

export const headerConfigs: IAppTableHeaderConfig[] = [
  {
    header: '#',
    isCenter: false,
  },
  {
    header: 'Title',
    isCenter: false,
  },
  {
    header: 'Type',
    isCenter: false,
  },
  {
    header: 'Creator',
    isCenter: false,
  },
  {
    header: 'Avatar',
    isCenter: false,
  },
  {
    header: 'Created',
    isCenter: true,
  },
  {
    header: 'Views',
    isCenter: true,
  },
];

export const rowConfigs: any[] = [
  {
    field: 'id',
    isCenter: false,
  },
  {
    field: 'title',
    isCenter: false,
  },
  {
    field: 'type',
    isCenter: false,
    isIcon: true,
  },
  {
    field: 'fullName',
    isCenter: false,
  },
  {
    field: 'profilePhotoUrl',
    isCenter: false,
    isAvatar: true,
  },
  {
    field: 'createdAt',
    isCenter: true,
  },
  {
    field: 'views',
    isCenter: true,
  },
];
