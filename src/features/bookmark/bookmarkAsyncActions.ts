import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../wrapper/store';
import { default as axios } from '../../solutions/services/axios';
import { userActions } from '../user';

export const createBookmark = createAsyncThunk(
  'bookmark/createBookmark',
  async (params: { postId: number; userId: number; }, { dispatch }) => {
    try {
      dispatch(wrapperActions.hideLoading());
      const { data } = await axios.post(
        '/bookmarks',
        { postId: params.postId, userId: params.userId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(userActions.addNewBookmarkedPost(data.value));
      dispatch(
        wrapperActions.showToast({
          toastSeverity: 'success',
          toastMessage: 'Save to bookmark successfully',
        }),
      );
      return data.value;
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);

export const unBookmark = createAsyncThunk(
  'bookmark/unBookmark',
  async (params: { bookmarkId: number; }, { dispatch }) => {
    try {
      dispatch(wrapperActions.hideLoading());
      const { data } = await axios.delete(`/bookmarks/${ params.bookmarkId }`);
      dispatch(userActions.removeBookmarkedPost(params));
      return data.value;
    } catch (error) {
      dispatch(
        wrapperActions.showNotification({
          typeOfNotification: 'error',
          message: error.response.data.message,
        }),
      );
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);
