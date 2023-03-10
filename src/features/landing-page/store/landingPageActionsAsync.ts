import { createAsyncThunk } from '@reduxjs/toolkit';
import categoryService from '../../../solutions/services/categoryService';
import postService from '../../../solutions/services/postService';
import AlertUtil from '../../../solutions/utils/alertUtil';
import { wrapperActions } from '../../wrapper/store';
import { default as axios } from './../../../solutions/services/axios';

export const landingPageActionsAsync = {
  getPostsAsync: createAsyncThunk(
    'landingPage/getPostsAsync',
    async (
      searchParams: { page: string; search: string; category: string; tag: string; },
      { dispatch },
    ) => {
      try {
        dispatch(wrapperActions.showLoading());
        const { data } = await postService.getPosts(searchParams);
        return data.value;
      } catch (error) {
        dispatch(
          wrapperActions.showNotification({
            typeOfNotification: 'error',
            message: error.response.data.message,
          }),
        );
      } finally {
        dispatch(wrapperActions.hideLoading());
      }
    },
  ),
  getAllCategoriesAsync: createAsyncThunk(
    'landingPage/getAllCategoriesAsync',
    async (_: any, { dispatch }) => {
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
    },
  ),
  getTopPosts: createAsyncThunk('landingPage/getTopPosts', async (_: any, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get('/posts/tops');
      return data.value;
    } catch (error) {
      AlertUtil.showError(error);
      dispatch(wrapperActions.hideLoading());
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getTotalPage: createAsyncThunk(
    'landingPage/getTotalPage',
    async (searchParams: { search: string; category: string; tag: string; }, { dispatch }) => {
      try {
        dispatch(wrapperActions.showLoading());
        let queryParams = [];
        if (searchParams.category) {
          queryParams.push(`category=${ searchParams.category }`);
        }
        if (searchParams.tag) {
          queryParams.push(`tag=${ searchParams.tag }`);
        }
        if (searchParams.search) {
          queryParams.push(`search=${ searchParams.search }`);
        }
        const queryString = `?${ queryParams.join('&') }`;
        const { data } = await axios.get(`/posts/getTotalPage${ queryString }`);
        return data.value;
      } catch (error) {
        dispatch(
          wrapperActions.showNotification({
            typeOfNotification: 'error',
            message: error.toString(),
          }),
        );
        return Promise.reject();
      } finally {
        dispatch(wrapperActions.hideLoading());
      }
    },
  ),
};
