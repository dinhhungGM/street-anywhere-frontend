import { default as axios } from './axios';

class PostService {
  createNewPost = async (payload: any) => {
    return await axios.post('/posts', payload, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
  };
  getPosts = async () => {
    return await axios.get('/posts');
  };
}

const postService = new PostService();
export default postService;
