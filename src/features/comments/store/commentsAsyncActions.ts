import { createAsyncThunk } from '@reduxjs/toolkit';
import { wrapperActions } from '../../wrapper/store';
import { default as axios } from './../../../solutions/services/axios';

interface IGetCommentListByPostId {
  postId: number;
  page?: number;
}
export const getCommentListByPostId = createAsyncThunk(
  'comments/getCommentListByPostId',
  async (params: IGetCommentListByPostId, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      const baseUrl = `/comments/post/${params.postId}`;
      const queryString = params.page !== undefined ? `${baseUrl}?page=${params.page}` : `${baseUrl}`;
      const { data } = await axios.get(queryString);
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
  currentPage?: number;
}
export const addComment = createAsyncThunk('comments/addComment', async (payload: IAddCommentPayload, { dispatch }) => {
  try {
    await axios.post(`/comments/post/${payload.postId}`, payload, {
      headers: {
        'content-type': 'application/json',
      },
    });
    dispatch(getCommentListByPostId({ postId: payload.postId, page: payload.currentPage }));
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
  currentPage?: number;
}
export const deleteCommentById = createAsyncThunk(
  'comments/deleteCommentById',
  async (payload: IDeleteCommentByIdPayload, { dispatch }) => {
    try {
      await axios.delete(`/comments/${payload.commentId}`);
      dispatch(getCommentListByPostId({ postId: payload.postId, page: payload.currentPage }));
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
  currentPage?: number;
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
      dispatch(getCommentListByPostId({ postId: payload.postId, page: payload.currentPage }));
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
