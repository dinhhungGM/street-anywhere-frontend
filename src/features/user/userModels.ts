export interface IReactedPost {
  postReactionId?: number;
  postId?: number;
  reactionType?: string;
}

export interface IBookmarkedPost {
  bookmarkId?: number;
  userId?: number;
  postId?: number;
}


export interface IFollowingUser {
  userId?: number;
  followerId?: number;
}