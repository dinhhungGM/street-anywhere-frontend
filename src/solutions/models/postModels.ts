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
  videoYtbUrl?:string;
  userId?:number;
}

export interface ITag {
  id: number;
  tagName: string;
}

export interface ICategory {
  id: number;
  categoryName: string;
}
