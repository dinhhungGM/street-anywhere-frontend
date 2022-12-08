import { createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../../../solutions/services/postService';
import AlertUtil from '../../../solutions/utils/alertUtil';
import { wrapperActions } from '../../wrapper/store';

export const postActionsAsync = {
  createPostActionAsync: createAsyncThunk('posts/createNewPost', async (payload: any, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await postService.createNewPost(payload);
      AlertUtil.showSuccess(data.message);
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error.response.data.message);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getPostByIdAsync: createAsyncThunk('post/getPostById', async (postId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await postService.getPostById(postId);
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getPostsByUserIdAsync: createAsyncThunk('post/getPostsByUserIdAsync', async (userId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await postService.getPostByUserId(userId);
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  incrementViewAsync: createAsyncThunk('post/incrementViewAsync', async (postId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await postService.incrementView(postId);
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
};
