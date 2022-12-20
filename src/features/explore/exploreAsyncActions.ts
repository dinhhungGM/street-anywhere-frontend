import { default as axios } from './../../solutions/services/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../wrapper/store';

export const findAroundHereData = createAsyncThunk(
  'explore/findAroundHereData',
  async (params: { long: number; lat: number; radius: number; }, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(
        `/posts/find-around-here?long=${ params.long }&lat=${ params.lat }&radius=${ params.radius }`,
      );
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
