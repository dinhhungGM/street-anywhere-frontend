import { default as axios } from './axios';

class BookmarkService {
  savePostToBookmark = async (payload: { userId: number; postId: number }) => {
    return await axios.post('/bookmarks', payload);
  };
  getStoredPostByUserId = async (userId: number) => {
    return await axios.get(`/bookmarks/user/${userId}`);
  };
}

const bookmarkService = new BookmarkService();
export default bookmarkService;
