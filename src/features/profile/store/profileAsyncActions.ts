import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../../wrapper/store';
import { default as axios } from './../../../solutions/services/axios';

export const getMyPost = createAsyncThunk('profile/getMyPost', async (userId: number, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await axios.get(`/posts/user/${userId}`);
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
});
