import { createSlice } from '@reduxjs/toolkit';

export interface IWrapperState {
  isLoading: boolean;
  isShowNotification: boolean;
}

const initialState: IWrapperState = {
  isLoading: false,
  isShowNotification: false,
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
  },
});

export default wrapperSlice;