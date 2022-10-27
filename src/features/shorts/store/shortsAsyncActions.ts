import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../../wrapper/store';
import { default as axios } from './../../../solutions/services/axios';

export const getShorts = createAsyncThunk('shorts/getShorts', async (_, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await axios.get('/posts/shorts');
    return data.value;
  } catch (error) {
    wrapperActions.showNotification({
      typeOfNotification: 'error',
      message: error.response.data.message,
    });
  } finally {
    dispatch(wrapperActions.hideLoading());
  }
});
