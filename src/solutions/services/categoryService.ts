import { default as axios } from './axios';

class CategoryService {
  getAllCategories = async () => {
    return await axios.get('/categories');
  };
}

const categoryService = new CategoryService();
export default categoryService;
