import { createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../../../solutions/services/postService';
import AlertUtil from '../../../solutions/utils/alertUtil';
import { wrapperActions } from '../../wrapper/store';
import { default as axios } from './../../../solutions/services/axios';

export const postActionsAsync = {
  createPostActionAsync: createAsyncThunk(
    'posts/createNewPost',
    async (payload: any, { dispatch }) => {
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
    },
  ),
  getPostByIdAsync: createAsyncThunk('post/getPostById', async (postId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await postService.getPostById(postId);
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getPostsByUserIdAsync: createAsyncThunk(
    'post/getPostsByUserIdAsync',
    async (userId: number, { dispatch }) => {
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
    },
  ),
  incrementViewAsync: createAsyncThunk(
    'post/incrementViewAsync',
    async (postId: number, { dispatch }) => {
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
    },
  ),
  getPostRelevantToCurrentPost: createAsyncThunk(
    'post/getPostRelevantToCurrentPost',
    async (payload: { categories: string[]; hashtags: string[]; postId: number; }, { dispatch }) => {
      try {
        dispatch(wrapperActions.showLoading());
        const { data } = await axios.post('/posts/relevant', payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return data.value;
      } catch (error) {
        dispatch(wrapperActions.hideLoading());
        AlertUtil.showError(error);
        return Promise.reject();
      } finally {
        dispatch(wrapperActions.hideLoading());
      }
    },
  ),
};
