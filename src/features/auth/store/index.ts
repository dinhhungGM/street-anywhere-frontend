import authSlice, { signInActionAsync } from './authSlice';
const { actions, reducer: authReducer } = authSlice;

const authActions = {
  ...actions,
  signInActionAsync,
};

export { authActions, authReducer };
