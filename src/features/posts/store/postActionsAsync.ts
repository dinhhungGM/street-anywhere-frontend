import { createAsyncThunk } from '@reduxjs/toolkit';
import bookmarkService from '../../../solutions/services/bookmarkService';
import postService from '../../../solutions/services/postService';
import reactionsService from '../../../solutions/services/reactionsService';
import AlertUtil from '../../../solutions/utils/alertUtil';
import { wrapperActions } from '../../wrapper/store';

export const postActionsAsync = {
  createPostActionAsync: createAsyncThunk('posts/createNewPost', async (payload: any, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await postService.createNewPost(payload);
      AlertUtil.showSuccess(data.message);
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getPostByIdAsync: createAsyncThunk('post/getPostById', async (postId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await postService.getPostById(postId);
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getPostsByUserIdAsync: createAsyncThunk('post/getPostsByUserIdAsync', async (userId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await postService.getPostByUserId(userId);
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  incrementViewAsync: createAsyncThunk('post/incrementViewAsync', async (postId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await postService.incrementView(postId);
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  addReactionAsync: createAsyncThunk(
    'post/addReactionAsync',
    async (payload: { reactionId: number; postId: number; userId: number }, { dispatch }) => {
      try {
        const { data } = await reactionsService.addReaction(payload);
        return data.value;
      } catch (error) {
        AlertUtil.showError(error);
        return Promise.reject();
      }
    },
  ),
  savePostToBookmark: createAsyncThunk(
    'post/savePostToBookmark',
    async (payload: { postId: number; userId: number }, { dispatch }) => {
      try {
        dispatch(wrapperActions.showLoading());
        const { data } = await bookmarkService.savePostToBookmark(payload);
        return data.value;
      } catch (error) {
        dispatch(wrapperActions.hideLoading());
        AlertUtil.showError(error);
        return Promise.reject();
      } finally {
        dispatch(wrapperActions.hideLoading());
      }
    },
  ),
  getStoredPostByUserId: createAsyncThunk('post/getStoredPostByUserId', async (userId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await bookmarkService.getStoredPostByUserId(userId);
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getReactionDetailsByPostIdAsync: createAsyncThunk(
    'post/getReactionDetailsByPostIdAsync',
    async (postId: number, { dispatch }) => {
      try {
        dispatch(wrapperActions.showLoading());
        const { data } = await reactionsService.getReactionDetailsByPostId(postId);
        return data.value;
      } catch (error) {
        dispatch(wrapperActions.hideLoading());
        AlertUtil.showError(error);
        return Promise.reject();
      } finally {
        dispatch(wrapperActions.hideLoading());
      }
    },
  ),
  updateReactionByPostReactionId: createAsyncThunk(
    'post/updateReactionByPostReactionId',
    async (payload: { postReactionId: number; reactionId: number }, { dispatch }) => {
      try {
        const { data } = await reactionsService.updateReactionByPostReactionId(
          payload.postReactionId,
          payload.reactionId,
        );
        return data.value;
      } catch (error) {
        AlertUtil.showError(error);
        return Promise.reject();
      }
    },
  ),
  deletePostReaction: createAsyncThunk('post/deletePostReaction', async (postReactionId: number) => {
    try {
      const { data } = await reactionsService.deleteReaction(postReactionId);
      return data.value;
    } catch (error) {
      AlertUtil.showError(error);
      return Promise.reject();
    }
  }),
  getBookmarkDetailsByPostId: createAsyncThunk('post/getBookmarkDetailsByPostId', async (postId: number) => {
    try {
      const { data } = await bookmarkService.getBookmarkDetailsByPostId(postId);
      return data.value;
    } catch (error) {
      AlertUtil.showError(error);
      return Promise.reject();
    }
  }),
  deleteBookmark: createAsyncThunk('post/deleteBookmark', async (bookmarkId: number) => {
    try {
      const { data } = await bookmarkService.deleteBookmark(bookmarkId);
      return data.value;
    } catch (error) {
      AlertUtil.showError(error);
      return Promise.reject();
    }
  }),
};
