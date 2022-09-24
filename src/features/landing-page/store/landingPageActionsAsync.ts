import { createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../../solutions/services/categoryService';
import postService from '../../../solutions/services/postService';
import tagService from '../../../solutions/services/tagService';
import AlertUtil from '../../../solutions/utils/alertUtil';
import { wrapperActions } from '../../wrapper/store';

export const landingPageActionsAsync = {
  getPostsAsync: createAsyncThunk('landingPage/getPostsAsync', async (_: any, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await postService.getPosts();
      return data.value;
    } catch (error) {
      AlertUtil.showError(error);
      dispatch(wrapperActions.hideLoading());
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getAllCategoriesAsync: createAsyncThunk('landingPage/getAllCategoriesAsync', async (_: any, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await categoryService.getAllCategories();
      return data.value;
    } catch (error) {
      AlertUtil.showError(error);
      dispatch(wrapperActions.hideLoading());
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getAllTagsAsync: createAsyncThunk('landingPage/getAllTagsAsync', async (_: any, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await tagService.getAllTags();
      return data.value;
    } catch (error) {
      AlertUtil.showError(error);
      dispatch(wrapperActions.hideLoading());
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
};
