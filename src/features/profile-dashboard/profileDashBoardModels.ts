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
}
