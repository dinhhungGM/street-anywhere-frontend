import categoriesSlice from './categoriesSlice';
import * as categoriesSelectors from './categoriesSelectors';
import * as categoriesModels from './categoriesModels';
import * as categoriesAsyncActions from './categoriesAsyncActions';

const categoriesReducer = categoriesSlice.reducer;
const categoriesActions = {
  ...categoriesSlice.actions,
  ...categoriesAsyncActions,
};

export { categoriesReducer, categoriesActions, categoriesSelectors, categoriesModels };
