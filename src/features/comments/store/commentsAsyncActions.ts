import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../../wrapper/store';
import { default as axios } from './../../../solutions/services/axios';

export const getCommentListByPostId = createAsyncThunk(
  'comments/getCommentListByPostId',
  async (postId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const { data } = await axios.get(`/comments/post/${postId}`);
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
  },
);

interface IAddCommentPayload {
  postId: number;
  userId: number;
  content: string;
}
export const addComment = createAsyncThunk('comments/addComment', async (payload: IAddCommentPayload, { dispatch }) => {
  try {
    await axios.post(`/comments/post/${payload.postId}`, payload, {
      headers: {
        'content-type': 'application/json',
      },
    });
    dispatch(getCommentListByPostId(payload.postId));
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
interface IDeleteCommentByIdPayload {
  commentId: number;
  postId: number;
}
export const deleteCommentById = createAsyncThunk(
  'comments/deleteCommentById',
  async (payload: IDeleteCommentByIdPayload, { dispatch }) => {
    try {
      await axios.delete(`/comments/${payload.commentId}`);
      dispatch(getCommentListByPostId(payload.postId));
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
  },
);
interface IUpdateCommentPayload {
  commentId: number;
  content: string;
  postId: number;
}
export const updateCommentByCommentId = createAsyncThunk(
  'comments/updateCommentByCommentId',
  async (payload: IUpdateCommentPayload, { dispatch }) => {
    try {
      await axios.patch(
        `/comments/${payload.commentId}`,
        {
          commentId: payload.commentId,
          content: payload.content,
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      dispatch(getCommentListByPostId(payload.postId));
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
  },
);
