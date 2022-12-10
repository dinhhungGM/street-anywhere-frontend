import { createSlice } from '@reduxjs/toolkit';
import * as wrapperAsyncActions from './wrapperAsyncActions';
import { IPostNotificationState } from './wrapperModels';

interface INotification {
  typeOfNotification: 'info' | 'success' | 'error' | 'warning' | 'confirm' | null;
  message: string;
}
interface IShowOrHideNotificationAction {
  type: string;
  payload: INotification;
}

interface IToastAction {
  type: string;
  payload: {
    toastSeverity: 'error' | 'warning' | 'info' | 'success' | null;
    toastMessage: string;
  };
}

interface IWrapperState {
  isLoading: boolean;
  isShowNotification: boolean;
  notificationInfo: INotification;
  postNotifications: IPostNotificationState;
  toastConfig: {
    isShowToast: boolean;
    toastSeverity: 'error' | 'warning' | 'info' | 'success' | null;
    toastMessage: string;
  } | null;
}

const initialState: IWrapperState = {
  isLoading: false,
  isShowNotification: false,
  notificationInfo: null,
  postNotifications: null,
  toastConfig: null
};

const wrapperSlice = createSlice({
  name: 'wrapper',
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    showNotification: (state, action: IShowOrHideNotificationAction) => {
      state.isShowNotification = true;
      state.notificationInfo = action.payload;
    },
    hideNotification: (state) => {
      state.isShowNotification = false;
      state.notificationInfo = null;
    },
    showToast: (state, action: IToastAction) => {
      state.toastConfig = {
        isShowToast: true,
        toastSeverity: action.payload.toastSeverity,
        toastMessage: action.payload.toastMessage
      };
    },
    hideToast: (state) => {
      state.toastConfig = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(wrapperAsyncActions.getNotifications.fulfilled, (state, { payload }) => {
      state.postNotifications = payload;
    });
    builder.addCase(wrapperAsyncActions.changeNotificationStatus.fulfilled, (state) => {
      state.postNotifications = {
        ...state.postNotifications,
        unSeenCount: 0,
        details: state.postNotifications.details.map((notification) => ({ ...notification, isSeen: true })),
      };
    });
  },
});

export const wrapperSyncActions = wrapperSlice.actions;
export default wrapperSlice;
