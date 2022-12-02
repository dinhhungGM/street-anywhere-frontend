import { createAsyncThunk } from '@reduxjs/toolkit';
import { default as axios } from './../../../solutions/services/axios';
import { wrapperSyncActions } from './wrapperSlice';

interface ICreateNewNotification {
  type: string;
  userId: number;
  reactionType?: string;
  postId: number;
}
export const createNewNotification = createAsyncThunk(
  'wrapper/createNewNotification',
  async (params: ICreateNewNotification, { dispatch }) => {
    try {
      dispatch(wrapperSyncActions.showLoading());
      const { data } = await axios.post(
        '/notifications',
        {
          type: params.type,
          userId: +params.userId,
          reactionType: params.reactionType || null,
          postId: +params.postId
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      dispatch(getNotifications(+params.userId));
      return data.value;
    } catch (error) {
      dispatch(
        wrapperSyncActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperSyncActions.hideLoading());
    }
  },
);

export const getNotifications = createAsyncThunk('wrapper/getNotifications', async (userId: number, { dispatch }) => {
  try {
    dispatch(wrapperSyncActions.showLoading());
    const { data } = await axios.get(`/notifications/users/${ userId }`);
    return data.value;
  } catch (error) {
    dispatch(
      wrapperSyncActions.showNotification({
        typeOfNotification: 'error',
        message: error.response.data.message,
      }),
    );
    return Promise.reject();
  } finally {
    dispatch(wrapperSyncActions.hideLoading());
  }
});

export const changeNotificationStatus = createAsyncThunk(
  'wrapper/changeNotificationStatus',
  async (notificationIds: number[], { dispatch }) => {
    try {
      dispatch(wrapperSyncActions.showLoading());
      for (const id of notificationIds) {
        await axios.patch(`/notifications/${ id }`);
      }
      return true;
    } catch (error) {
      dispatch(
        wrapperSyncActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
      return Promise.reject();
    } finally {
      dispatch(wrapperSyncActions.hideLoading());
    }
  },
);
