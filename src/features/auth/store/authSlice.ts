import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../../solutions/services/authService';
import AlertUtil from '../../../solutions/utils/alertUtil';
import { wrapperActions } from '../../wrapper/store';
import { ISignUpPayload, ISignInPayload, IUser } from '../../../solutions/models/authModels';

export type AuthState = {
  currentUser: IUser;
};

const initialState: AuthState = {
  currentUser: null,
};

export const signInActionAsync = createAsyncThunk('auth/signIn', async (payload: ISignInPayload, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await authService.signIn(payload);
    return data.value;
  } catch (error: any) {
    dispatch(wrapperActions.hideLoading());
    const message = error.response.data.message ?? error.message;
    AlertUtil.showError(message);
    return Promise.reject();
  } finally {
    dispatch(wrapperActions.hideLoading());
  }
});

export const signUpActionAsync = createAsyncThunk('auth/signUp', async (payload: ISignUpPayload, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await authService.signUp(payload);
    return data.value;
  } catch (error: any) {
    dispatch(wrapperActions.hideLoading());
    AlertUtil.showError(error.response.data.message);
    return Promise.reject();
  } finally {
    dispatch(wrapperActions.hideLoading());
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signOut: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInActionAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    });
    builder.addCase(signUpActionAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    });
  },
});

export default authSlice;
