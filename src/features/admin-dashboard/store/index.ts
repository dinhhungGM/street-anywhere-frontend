import adminSlice from './adminSlice';
import * as adminSelectors from './adminSelectors';
import * as adminAsyncActions from './adminAsyncActions';

const adminReducer = adminSlice.reducer;
const adminActions = {
  ...adminSlice.actions,
  ...adminAsyncActions,
};

export { adminReducer, adminActions, adminSelectors };
