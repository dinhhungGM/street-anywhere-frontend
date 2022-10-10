import profileSlice from './profileSlice';
import * as profileSelectors from './profileSelectors';

const profileReducer = profileSlice.reducer;
const profileActions = {
  ...profileSlice.actions,
};
export { profileReducer, profileActions, profileSelectors };
