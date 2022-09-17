import { createAsyncThunk } from '@reduxjs/toolkit';
import postService from '../../../solutions/services/postService';
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
};
