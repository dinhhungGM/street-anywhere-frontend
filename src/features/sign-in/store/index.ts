import authSlice, { signInActionAsync } from './signInSlice';
const { actions, reducer: authReducer } = authSlice;

const authActions = {
  ...actions,
  signInActionAsync,
};

export { authActions, authReducer };
