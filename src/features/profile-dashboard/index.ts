import * as profileAsyncActions from './profileDashboardAsyncActions';
import * as models from './profileDashBoardModels';
import * as selectors from './profileDashBoardSelectors';
import profileSlice from './profileDashboardSlice';

export { default as ProfileDashboard } from './ProfileDashBoard';
export const profileReducer = profileSlice.reducer;
export const profileActions = {
  ...profileSlice.actions,
  ...profileAsyncActions,
};
export const profileSelectors = selectors;
export const profileModels = models;
