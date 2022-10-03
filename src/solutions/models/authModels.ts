export interface IRole {
  id?: number;
  roleName?:string;
}
export interface IRank {
  id?:number;
  rankName?:string;
}

export interface IUser {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  fullName?:string;
  profilePhotoUrl?: string;
  bio?: string;
  role?: IRole, 
  rank?: IRank;
  isAdmin?:boolean;
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
