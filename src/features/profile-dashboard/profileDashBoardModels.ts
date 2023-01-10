import { IFollowingUser } from '../user/userModels';

export interface IMyPost {
  id?: number;
  type?: string;
  size?: number;
  title?: string;
  views?: number;
  userId?: number;
  tags?: string[];
  latitude?: number;
  location?: string;
  imageUrl?: string;
  longitude?: number;
  createdAt?: string;
  shortTitle?: string;
  description?: string;
  videoYtbUrl?: string;
  commentCount?: number;
  categories?: string[];
  reactionCount?: number;
  bookmarkCount?: number;
}

interface IProfilePostComment {
  id?: number;
  content?: string;
  postId?: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}
interface IProfilePost {
  id?: number;
  title?: string;
  location?: string;
  longitude?: number;
  latitude?: number;
  userId?: number;
  type?: string;
  size?: number;
  mediaSource?: string;
  shortTitle?: string;
  description?: string;
  videoYtbUrl?: string;
  views?: number;
  createdAt?: string;
  updatedAt?: string;
  comments?: IProfilePostComment[];
}
export interface IProfileDetail {
  id?: number;
  bio?: string;
  phone?: string;
  email?: string;
  roleId?: number;
  rankId?: number;
  imgType?: string;
  username?: string;
  fullName?: string;
  lastName?: string;
  firstName?: string;
  description?: string;
  commentCount?: number;
  bookmarkCount?: number;
  profilePhotoUrl?: string;
  coverImageUrl?: string;
  posts?: IProfilePost[];
  rankName?: string;
  rankLogoUrl?: string;
}

export enum ProfilePropertiesEnum {
  Password = 'password',
  FirstName = 'firstName',
  LastName = 'lastName',
  Email = 'email',
  Phone = 'phone',
  Bio = 'bio',
  Avatar = 'avatar',
  CoverImage = 'coverImage',
}

export interface IBookmarkedPost {
  id?: number;
  size?: number;
  type?: string;
  title?: string;
  views?: number;
  userId?: number;
  latitude?: string;
  location?: number;
  imageUrl?: string;
  fullName?: string;
  longitude?: number;
  description?: null;
  videoYtbUrl?: null;
  createdAt?: string;
  shortTitle?: string;
  bookmarkId?: number;
  profilePhotoUr1l?: string;
  followingDetail?: IFollowingUser | null | undefined;
  isFollowingUser?: boolean;
}
