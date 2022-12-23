export { default as AppTable } from './AppTable';

export interface IAppTableHeaderConfig {
  isCenter?: boolean;
  header?: string;
  customClass?: string;
}

export interface IAppTableRowConfig {
  isCenter?: boolean;
  field?: string;
  customClass?: string;
  isAvatar?: boolean;
}
