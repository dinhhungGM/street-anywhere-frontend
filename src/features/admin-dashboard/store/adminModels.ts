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
  numberOfUses: number;
}
export interface ICategoryManagement {
  id: number;
  categoryName: string;
  numberOfUses: number;
}
export interface IHashTagManagement {
  id: number;
  tagName: string;
  numberOfUses: number;
}

export interface IUserByFollowers {
  id: number;
  fullName: string;
  totalPost: number;
  profilePhotoUrl: string;
}

export interface IUserMostFollower {
  id: number;
  fullName: string;
  totalFollower: number;
  profilePhotoUrl: string;
}

export interface IUserMostPost {
  id: number;
  fullName: string;
  totalPost: number;
  profilePhotoUrl: string;
}

export interface ISystemStats {
  totalUsers: number;
  totalPosts: number;
  totalImages: number;
  totalVideos: number;
  totalReactionIcons: number;
  totalCategories: number;
}

export interface IUsersMostInteraction {
  id: number;
  fullName: string;
  profilePhotoUrl: string;
  totalInteraction: number;
}

export interface IUsersMostBookmark {
  id: number;
  fullName: string;
  profilePhotoUrl: string;
  totalBookmark: number;
}
