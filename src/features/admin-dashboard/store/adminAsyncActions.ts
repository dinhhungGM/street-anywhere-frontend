import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../../wrapper/store';
import { default as axios } from './../../../solutions/services/axios';

export const getAllUsersForManagement = createAsyncThunk(
  'admin/getAllUsersForManagement',
  async (userId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/admin/users?adminUserId=${userId}`);
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
);
interface IDeleteUserPayload {
  adminUserId: number;
  userId: number;
}
export const deleteUser = createAsyncThunk('admin/deleteUser', async (payload: IDeleteUserPayload, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    await axios.delete(`/admin/users/${payload.userId}?adminUserId=${payload.adminUserId}`);
    dispatch(getAllUsersForManagement(payload.adminUserId));
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
});
