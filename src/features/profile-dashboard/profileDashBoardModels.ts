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
