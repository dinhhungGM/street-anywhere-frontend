import { default as axios } from './axios';

class PostService {
  createNewPost = async (payload: any) => {
    return await axios.post('/posts', payload, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };

  getPosts = async (searchParams?: any) => {
    let queryParams = [];
    if (searchParams.page) {
      queryParams.push(`page=${searchParams.page}`);
    }
    if (searchParams.category) {
      queryParams.push(`category=${searchParams.category}`);
    }
    if (searchParams.tag) {
      queryParams.push(`tag=${searchParams.tag}`);
    }
    const queryString = `?${queryParams.join('&')}`;
    return await axios.get(`/posts${queryString}`);
  };

  getPostById = async (postId: number) => {
    return await axios.get(`/posts/${postId}`);
  };

  deletePost = async (postId: number) => {
    return await axios.delete(`/posts/${postId}`);
  };

  getPostByUserId = async (userId: number) => {
    return await axios.get(`/posts/user/${userId}`);
  };

  incrementView = async (postId: number) => {
    return await axios.patch(`/posts/addView/${postId}`);
  };
}

const postService = new PostService();
export default postService;
