export interface IReaction {
  id?: number;
  reactionType?: string;
  icon?: string;
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
  user: {
    id: number;
    fullName: string;
    profilePhotoUrl: string;
  };
  videoYtbUrl?: string;
  userId?: number;
  views?: number;
  reactions?: {
    reactionId?: number;
    count?: number;
    users?: number[];
  };
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
