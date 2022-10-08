import { createAsyncThunk } from '@reduxjs/toolkit';
import bookmarkService from '../../../solutions/services/bookmarkService';
import categoryService from '../../../solutions/services/categoryService';
import postService from '../../../solutions/services/postService';
import reactionsService from '../../../solutions/services/reactionsService';
import tagService from '../../../solutions/services/tagService';
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
  getTagsAsync: createAsyncThunk('post/getTags', async (_: any, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await tagService.getAllTags();
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
  getCategoriesAsync: createAsyncThunk('post/getCategories', async (_: any, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await categoryService.getAllCategories();
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
  getReactionsAsync: createAsyncThunk('post/getReactionsAsync', async () => {
    try {
      const { data } = await reactionsService.getReactions();
      return data.value;
    } catch (error) {
      AlertUtil.showError(error);
      return Promise.reject();
    }
  }),
  addReactionAsync: createAsyncThunk(
    'post/addReactionAsync',
    async (payload: { reactionId: number; postId: number; userId: number }, { dispatch }) => {
      try {
        dispatch(wrapperActions.showLoading());
        const { data } = await reactionsService.addReaction(payload);
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
        dispatch(wrapperActions.showLoading());
        const { data } = await reactionsService.updateReactionByPostReactionId(
          payload.postReactionId,
          payload.reactionId,
        );
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
  deletePostReaction: createAsyncThunk('post/deletePostReaction', async (postReactionId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await reactionsService.deleteReaction(postReactionId);
      return data.value;
    } catch (error) {
      dispatch(wrapperActions.hideLoading());
      AlertUtil.showError(error);
      return Promise.reject();
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  }),
};
