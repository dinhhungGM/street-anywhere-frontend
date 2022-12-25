import { IBookmarkedPost, IReactedPost, IFollowingUser } from '../../features/user/userModels';
export interface IReaction {
  reactionType?: string;
  total?: number;
  reactedUsers?: { postReactionId?: number; userId?: number; }[];
}

export interface IBookmark {
  bookmarkId?: number;
  userId?: number;
}

export interface IPost {
  id: number;
  title: string;
  shortTitle: string;
  location: string;
  latitude: number;
  longitude: number;
  description: string;
  type: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  categories: string[];
  tags: string[];
  videoYtbUrl?: string;
  views?: number;
  userId?: number;
  fullName?: string;
  profilePhotoUrl?: string;
  isHasLocation?: boolean;
  reactions?: IReaction[];
  totalReactions?: number;
  bookmarks?: IBookmark[];
  totalBookmark?: number;
  reactedDetail?: IReactedPost | null | undefined;
  isReacted?: boolean;
  bookmarkedDetail?: IBookmarkedPost | null | undefined;
  isBookmarked?: boolean;
  followingDetail?: IFollowingUser | null | undefined;
  isFollowingUser?: boolean;
  distance?: number;
  size?: number;
}

export interface ITag {
  id: number;
  tagName: string;
}

export interface ICategory {
  id: number;
  categoryName: string;
}

export interface IUserReaction {
  userId?: number;
  fullName?: string;
  postReactionId?: number;
}

export interface IReactionDetails {
  count?: number;
  users?: IUserReaction[];
}
export interface IPostReactionDetails {
  reactionCountAll?: number;
  reactionDetails?: any;
}

export interface IBookmarkDetail {
  bookmarkId?: number;
  userId?: number;
}
