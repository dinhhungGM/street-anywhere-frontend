import { createAsyncThunk } from '@reduxjs/toolkit';
import { userActions } from '.';
import AlertUtil from '../../solutions/utils/alertUtil';
import { wrapperActions } from '../wrapper/store';
import { default as axios } from './../../solutions/services/axios';

export const followUser = createAsyncThunk(
  'user/followUser',
  async (payload: { userId: number; followerId: number; }, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.post('/followers', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(userActions.addNewFollowingUser(data.value));
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

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async (params: { userId: number; followerId: number; }, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      await axios.post('/followers/unfollow', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(userActions.removeFollowingUser(params));
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error.response.data.message);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);

export const getReactedPost = createAsyncThunk(
  'user/getReactedPost',
  async (userId: number, { dispatch }) => {
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
  },
);

export const getBookmarkedPost = createAsyncThunk(
  'user/getBookmarkedPost',
  async (userId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/bookmarks/bookmarked-posts/${ userId }`);
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

export const getFollowingUsers = createAsyncThunk(
  'user/getFollowingUsers',
  async (userId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/users/following/${ userId }`);
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
