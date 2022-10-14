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
interface IUpdateUserPayload {
  userId: number;
  formData: FormData;
}
export const updateUser = createAsyncThunk('profile/updateUser', async (payload: IUpdateUserPayload, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { userId, formData } = payload;
    const { data } = await axios.patch(`/users/${userId}`, formData, {
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
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
