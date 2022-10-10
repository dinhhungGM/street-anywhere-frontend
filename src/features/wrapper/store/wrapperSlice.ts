import { createSlice } from '@reduxjs/toolkit';

export interface IWrapperState {
  isLoading: boolean;
  isShowNotification: boolean;
  notificationInfo: {
    typeOfNotification: 'info' | 'success' | 'error' | 'warning' | 'confirm' | null;
    message: string;
  };
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
    showNotification: (state) => {
      state.isShowNotification = true;
    },
    hideNotification: (state) => {
      state.isShowNotification = false;
      state.notificationInfo = null;
    },
  },
});

export default wrapperSlice;
