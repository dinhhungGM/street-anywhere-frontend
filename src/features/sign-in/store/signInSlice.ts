import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../../solutions/services/authService';
import AlertUtil from '../../../solutions/utils/alertUtil';
import { wrapperActions } from '../../wrapper/store';
import { SignUpPayload, SignInPayload } from '../../../solutions/models/authModels';

export type User = {
  username: string;
  password: string;
};

export type AuthState = {
  currentUser: User | null;
};

const initialState: AuthState = {
  currentUser: null,
};

export const signInActionAsync = createAsyncThunk('auth/signIn', async (payload: SignInPayload, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await authService.signIn(payload);
    return data.value;
  } catch (error: any) {
    dispatch(wrapperActions.hideLoading());
    const message = error.response.data.message;
    AlertUtil.showError(message);
  } finally {
    dispatch(wrapperActions.hideLoading());
  }
});

export const signUpActionAsync = createAsyncThunk('auth/signUp', async (payload: SignUpPayload, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await authService.signUp(payload);
    return data.value;
  } catch (error: any) {
    dispatch(wrapperActions.hideLoading());
    const message = error.response.data.message;
    AlertUtil.showError(message);
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInActionAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    builder.addCase(signUpActionAsync.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
  },
});

export default authSlice;
