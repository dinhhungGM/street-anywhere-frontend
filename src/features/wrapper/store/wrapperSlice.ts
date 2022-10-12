import { createSlice } from '@reduxjs/toolkit';

interface INotification {
  typeOfNotification: 'info' | 'success' | 'error' | 'warning' | 'confirm' | null;
  message: string;
}
interface IWrapperState {
  isLoading: boolean;
  isShowNotification: boolean;
  notificationInfo: INotification;
}

interface IShowOrHideNotificationAction {
  type: string;
  payload: INotification;
}

const initialState: IWrapperState = {
  isLoading: false,
  isShowNotification: false,
  notificationInfo: null,
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
  },
});

export default wrapperSlice;
