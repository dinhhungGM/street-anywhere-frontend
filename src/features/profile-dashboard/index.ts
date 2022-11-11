import profileSlice from './profileDashboardSlice';
import * as profileAsyncActions from './profileDashboardAsyncActions';
import * as selectors from './profileDashBoardSelectors';

export { default as ProfileDashboard } from './ProfileDashBoard';
export const profileReducer = profileSlice.reducer;
export const profileActions = {
  ...profileSlice.actions,
  ...profileAsyncActions,
};
export const profileSelectors = selectors;
