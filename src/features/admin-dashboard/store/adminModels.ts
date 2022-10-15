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
  roleId: number;
}
export interface IRoleManagement {
  id: number;
  roleName: string;
  users: IUserByRole[];
}

export interface IReactionManagement {
  id: number;
  reactionType: string;
  icon: any;
  numberOfUses: 4;
}
