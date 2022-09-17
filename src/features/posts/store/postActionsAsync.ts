import { createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../../solutions/services/categoryService';
import postService from '../../../solutions/services/postService';
import tagService from '../../../solutions/services/tagService';
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
      AlertUtil.showError(error);
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getTagsAsync: createAsyncThunk('post/getTags', async (_: any, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await tagService.getAllTags();
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getCategoriesAsync: createAsyncThunk('post/getCategories', async (_: any, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await categoryService.getAllCategories();
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
};
