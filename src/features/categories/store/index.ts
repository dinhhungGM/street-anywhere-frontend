import categoriesSlice from './categoriesSlice';
import * as CategoriesSelectors from './categoriesSelectors';
import * as CategoriesModels from './categoriesModels';

const categoriesReducer = categoriesSlice.reducer;
const categoriesActions = {
  ...categoriesSlice.actions,
};

export { categoriesReducer, categoriesActions, CategoriesSelectors, CategoriesModels };
