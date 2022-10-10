import categoriesSlice from './categoriesSlice';
import * as categoriesSelectors from './categoriesSelectors';

const categoriesReducer = categoriesSlice.reducer;
const categoriesActions = {
  ...categoriesSlice.actions,
};

export { categoriesReducer, categoriesActions, categoriesSelectors };
