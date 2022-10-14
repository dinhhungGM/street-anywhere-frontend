export interface IUserManagement {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
  bio: string;
  rankId: number;
  role: string;
  isAdmin: boolean;
  postCount: number;
}

interface IUserByRole {
  id: number;
  fullName: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
  rankId: number;
}
export interface IRoleManagement {
  id: number;
  roleName: string;
  users: IUserByRole[];
}
