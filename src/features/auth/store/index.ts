import authSlice, { signInActionAsync, signUpActionAsync } from './authSlice';
const { actions, reducer: authReducer } = authSlice;

const authActions = {
  ...actions,
  signInActionAsync,
  signUpActionAsync,
};

export { authActions, authReducer };
