import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../wrapper/store';
import { default as axios } from '../../solutions/services/axios';
import { userActions } from '../user';
import { postActions } from '../posts/store';

export const createBookmark = createAsyncThunk(
  'bookmark/createBookmark',
  async (params: { postId: number; userId: number; isDetailPage?: boolean; }, { dispatch }) => {
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
      if (params.isDetailPage) {
        dispatch(postActions.addBookmark(data.value));
      } else {
        dispatch(userActions.addNewBookmarkedPost(data.value));
      }
      dispatch(
        wrapperActions.showToast({
          toastSeverity: 'success',
          toastMessage: 'Save to bookmark successfully',
        }),
      );
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

export const unBookmark = createAsyncThunk(
  'bookmark/unBookmark',
  async (params: { bookmarkId: number; isDetailPage?: boolean; }, { dispatch }) => {
    try {
      dispatch(wrapperActions.hideLoading());
      const { data } = await axios.delete(`/bookmarks/${ params.bookmarkId }`);
      if (params.isDetailPage) {
        dispatch(postActions.removeBookmark({ bookmarkId: params.bookmarkId }));
      } else {
        dispatch(userActions.removeBookmarkedPost({ bookmarkId: params.bookmarkId }));
      }
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
