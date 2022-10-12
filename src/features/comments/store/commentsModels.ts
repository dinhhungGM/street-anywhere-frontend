export interface IComment {
  id: number;
  content: string;
  postId: number;
  userId: number;
  createdAt: string;
  user: {
    fullName: string;
    id: number;
    profilePhotoUrl: string;
    rankId: number;
    firstName: string;
    lastName: string;
  };
}
