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

export interface ISearchingUser {
  userId?: number;
  fullName?: string;
  profilePhotoUrl?: string;
  totalPost?: number;
  description: string;

}