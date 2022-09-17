import authSlice, { signInActionAsync, signUpActionAsync } from './authSlice';
import * as authSelectors from './authSelectors';
const { actions, reducer: authReducer } = authSlice;

const authActions = {
  ...actions,
  signInActionAsync,
  signUpActionAsync,
};

export { authActions, authReducer, authSelectors };
