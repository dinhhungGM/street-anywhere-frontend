import categoriesSlice from './categoriesSlice';
import * as categoriesSelectors from './categoriesSelectors';
import * as categoriesModels from './categoriesModels';

const categoriesReducer = categoriesSlice.reducer;
const categoriesActions = {
  ...categoriesSlice.actions,
};

export { categoriesReducer, categoriesActions, categoriesSelectors, categoriesModels };
