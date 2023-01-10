import authSlice, { signInActionAsync, signUpActionAsync, signInByGoogle } from './authSlice';
import * as authSelectors from './authSelectors';
const { actions, reducer: authReducer } = authSlice;

const authActions = {
  ...actions,
  signInActionAsync,
  signUpActionAsync,
  signInByGoogle,
};

export { authActions, authReducer, authSelectors };
