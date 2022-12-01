export interface IPostNotification {
  id?: number;
  userId?: number;
  postId?: number;
  isSeen?: boolean;
  reactionType?: string;
  createdAt?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  profilePhotoUrl?: string;
  shortTitle?: string;
}

export interface IPostNotificationState {
  count?: number;
  details?: IPostNotification[];
}
