import { default as axios } from './axios';

class TagService {
  getAllTags = async () => {
    return await axios.get('/tags');
  };
}

const tagService = new TagService();
export default tagService;
