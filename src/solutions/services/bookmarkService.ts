import { default as axios } from './axios';

class BookmarkService {
  savePostToBookmark = async (payload: { userId: number; postId: number }) => {
    return await axios.post('/bookmarks', payload);
  };
  getStoredPostByUserId = async (userId: number) => {
    return await axios.get(`/bookmarks/user/${userId}`);
  };
  getBookmarkDetailsByPostId = async (postId: number) => {
    return await axios.get(`/bookmarks/post/${postId}`);
  };
  deleteBookmark = async (bookmarkId: number) => {
    return await axios.delete(`/bookmarks/${bookmarkId}`);
  };
}

const bookmarkService = new BookmarkService();
export default bookmarkService;
