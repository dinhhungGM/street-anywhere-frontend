import { default as axios } from './axios';

class ReactionsService {
  getReactions = async () => {
    return await axios.get('/reactions');
  };
  addReaction = async (payload: { reactionId: number; postId: number; userId: number }) => {
    return await axios.post(`/reactions/post/${payload.postId}`, payload);
  };
  getReactionDetailsByPostId = async (postId: number) => {
    return await axios.get(`/reactions/post/${postId}`);
  };
  updateReactionByPostReactionId = async (postReactionId: number, reactionId: number) => {
    return await axios.patch(`/reactions/${postReactionId}`, { reactionId });
  };
}

const reactionsService = new ReactionsService();
export default reactionsService;
