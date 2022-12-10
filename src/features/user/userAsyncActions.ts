import { createAsyncThunk } from '@reduxjs/toolkit';
import AlertUtil from '../../solutions/utils/alertUtil';
import { wrapperActions } from '../wrapper/store';
import { default as axios } from './../../solutions/services/axios';

export const followerUser = createAsyncThunk(
  'user/followUser',
  async (payload: { userId: number; followerId: number; }, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.post('/followers', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(
        wrapperActions.showToast({
          toastSeverity: 'success',
          toastMessage: 'Followed',
        }),
      );
      return data.value;
    } catch (error: any) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error.response.data.message);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);

export const getReactedPost = createAsyncThunk('user/getReactedPost', async (userId: number, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await axios.get(`/users/reacted/${ userId }`);
    return data.value;
  } catch (error: any) {
    dispatch(wrapperActions.hideLoading());
    AlertUtil.showError(error.response.data.message);
    return Promise.reject();
  } finally {
    dispatch(wrapperActions.hideLoading());
  }
});

export const getBookmarkedPost = createAsyncThunk('user/getBookmarkedPost', async (userId: number, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await axios.get(`/users/bookmarked/${ userId }`);
    return data.value;
  } catch (error: any) {
    dispatch(wrapperActions.hideLoading());
    AlertUtil.showError(error.response.data.message);
    return Promise.reject();
  } finally {
    dispatch(wrapperActions.hideLoading());
  }
});
