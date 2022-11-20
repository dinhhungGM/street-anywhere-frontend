export interface IRole {
  id?: number;
  roleName?: string;
}
export interface IRank {
  id?: number;
  rankName?: string;
}

export interface IUser {
  id?: number;
  role?: IRole;
  rank?: IRank;
  bio?: string;
  phone?: string;
  email?: string;
  isAdmin?: boolean;
  fullName?: string;
  username?: string;
  lastName?: string;
  firstName?: string;
  description?: string;
  coverImageUrl?: string;
  profilePhotoUrl?: string;
}

export interface ISignInPayload {
  username: string;
  password: string;
}
export interface ISignUpPayload {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}
