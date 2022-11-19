import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../wrapper/store';
import { default as axios } from './../../solutions/services/axios';

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

export const deletePostById = createAsyncThunk('profile/deletePostById', async (postId: number, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await axios.delete(`/posts/${ postId }`);
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
});
