import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../wrapper/store';
import { default as axios } from './../../solutions/services/axios';
import { profileSyncActions } from './profileDashboardSlice';

export const getAllPostsOfCurrentUser = createAsyncThunk(
  'profile/getAllPostsOfCurrentUser',
  async (userId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/posts/user/${ userId }`);
      return data.value;
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);

export const deletePostById = createAsyncThunk(
  'profile/deletePostById',
  async (postId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      await axios.delete(`/posts/${ postId }`);
      dispatch(
        wrapperActions.showToast({
          toastSeverity: 'success',
          toastMessage: 'Delete successfully',
        }),
      );
      dispatch(profileSyncActions.removeDeletedPost({ postId }));
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);

export const getProfileOfUser = createAsyncThunk(
  'profile/getProfileOfUser',
  async (userId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/users/${ userId }`);
      return data.value;
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);

export const updateUser = createAsyncThunk(
  'profile/updateUser',
  async (params: { userId: number; payload: any; isFormData: boolean; }, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      await axios.patch(`/users/${ params.userId }`, params.payload, {
        headers: {
          'Content-Type': params.isFormData ? 'multipart/form-data' : 'application/json',
        },
      });
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'success',
          message: 'Update successfully',
        }),
      );
      dispatch(getProfileOfUser(params.userId));
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);

export const getFollowers = createAsyncThunk(
  'profile/getFollowers',
  async (userId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/users/followers/${ userId }`);
      return data.value;
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);

export const getPostsOfUser = createAsyncThunk(
  'profile/getPostsOfUser',
  async (params: { mediaType: string; userId: number; }, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(
        `/posts/user/${ params.userId }?mediatype=${ params.mediaType }`,
      );
      return data.value;
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);
