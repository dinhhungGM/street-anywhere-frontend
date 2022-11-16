import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../../wrapper/store';
import { default as axios } from './../../../solutions/services/axios';

export const getCategoryList = createAsyncThunk('categories/getCategoryList', async (_, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await axios.get('/categories');
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

export const createNewCategory = createAsyncThunk(
  'categories/createNewCategory',
  async (categoryName: string, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.post(
        '/categories',
        {
          categoryName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(getCategoryList());
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
