import profileSlice from './profileSlice';
import * as profileSelectors from './profileSelectors';
import * as profileAsyncActions from './profileAsyncActions';

const profileReducer = profileSlice.reducer;
const profileActions = {
  ...profileSlice.actions,
  ...profileAsyncActions,
};
export { profileReducer, profileActions, profileSelectors };
