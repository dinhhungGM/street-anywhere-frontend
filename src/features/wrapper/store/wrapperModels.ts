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
  type?: string;
}

export interface IPostNotificationState {
  count?: number;
  unSeenCount?: number;
  details?: IPostNotification[];
}
