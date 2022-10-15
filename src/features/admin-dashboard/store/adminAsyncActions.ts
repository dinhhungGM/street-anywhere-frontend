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
      return Promise.reject();
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
    return Promise.reject();
  } finally {
    dispatch(wrapperActions.hideLoading());
  }
});
interface ICreateNewUserParams {
  adminUserId: number;
  payload: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    roleId: string;
  };
}
export const createNewUser = createAsyncThunk(
  'admin/createNewUser',
  async (params: ICreateNewUserParams, { dispatch }) => {
    try {
      const { adminUserId, payload } = params;
      dispatch(wrapperActions.showLoading());
      await axios.post(`/admin/users?adminUserId=${adminUserId}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      dispatch(getAllUsersForManagement(adminUserId));
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);
export const getAllRolesForManagement = createAsyncThunk(
  'admin/getAllRolesForManagement',
  async (adminUserId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/admin/roles?adminUserId=${adminUserId}`);
      return data.value;
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);
export const getAllReactionsForManagement = createAsyncThunk(
  'admin/getAllReactionsForManagement',
  async (adminUserId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/admin/reactions?adminUserId=${adminUserId}`);
      return data.value;
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);
export const getAllCategoriesForManagement = createAsyncThunk(
  'admin/getAllCategoriesForManagement',
  async (adminUserId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/admin/categories?adminUserId=${adminUserId}`);
      return data.value;
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);
export const getAllHashTagsForManagement = createAsyncThunk(
  'admin/getAllHashTagsForManagement',
  async (adminUserId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/admin/tags?adminUserId=${adminUserId}`);
      return data.value;
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);
