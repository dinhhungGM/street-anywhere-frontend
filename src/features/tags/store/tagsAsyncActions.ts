import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../../wrapper/store';
import { default as axios } from './../../../solutions/services/axios';

export const getTagList = createAsyncThunk('tags/getTagList', async (_, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await axios.get('/tags');
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

export const createNewHashTag = createAsyncThunk(
  'categories/createNewHashTag',
  async (tagName: string, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.post(
        '/tags',
        {
          tagName,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(getTagList());
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
