import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../../wrapper/store';
import { default as axios } from './../../../solutions/services/axios';

export const getCommentListByPostId = createAsyncThunk(
  'comments/getCommentListByPostId',
  async (postId, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/comments/post/${postId}`);
      return data.value;
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.toString(),
        }),
      );
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);
