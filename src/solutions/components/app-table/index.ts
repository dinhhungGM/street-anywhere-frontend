export { default as AppTable } from './AppTable';

export interface IAppTableHeaderConfig {
  isCenter?: boolean;
  header?: string;
  customClass?: string;
}

export interface IAppTableColumnConfig {
  isCenter?: boolean;
  field?: string;
  customClass?: string;
  isAvatar?: boolean;
}
