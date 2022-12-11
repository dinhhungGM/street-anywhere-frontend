import { createAsyncThunk } from '@reduxjs/toolkit';
import { postActions } from '../../posts/store';
import { wrapperActions } from '../../wrapper/store';
import { default as axios } from './../../../solutions/services/axios';

export const getReactionList = createAsyncThunk('reactions/getReactions', async (_, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await axios.get('/reactions');
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
});

interface IAddReactionPayload {
  reactionId: number;
  postId: number;
  userId: number;
  reactionType: string;
}
export const addReaction = createAsyncThunk(
  'reactions/addReaction',
  async (params: IAddReactionPayload, { dispatch }) => {
    const { reactionType, ...payload } = params;
    try {
      await axios.post(`/reactions/post/${ payload.postId }`, payload, {
        headers: {
          'content-type': 'application/json',
        },
      });
      // dispatch(postActions.addNewReaction({ reactionType, ...data.value }));
      dispatch(
        wrapperActions.showToast({
          toastSeverity: 'success',
          toastMessage: 'Add reaction successfully',
        }),
      );
      dispatch(postActions.getPostByIdAsync(payload.postId));
    } catch (error) {
      wrapperActions.showNotification({
        typeOfNotification: 'error',
        message: error.response.data.message,
      });
    } finally {
      dispatch(wrapperActions.hideLoading());
    }
  },
);

export const getPostsByReaction = createAsyncThunk('reactions/getPostsByReaction', async (_, { dispatch }) => {
  try {
    dispatch(wrapperActions.showLoading());
    const { data } = await axios.get('/posts/reactions');
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
});

export const removeReaction = createAsyncThunk(
  'reactions/removeReaction',
  async (params: { postReactionId: number; postId: number; }, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      await axios.delete(`/reactions/${ params.postReactionId }`);
      dispatch(
        wrapperActions.showToast({
          toastSeverity: 'success',
          toastMessage: 'Removed',
        }),
      );
      dispatch(postActions.getPostByIdAsync(params.postId));
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

export const changeReaction = createAsyncThunk(
  'reactions/changeReaction',
  async (params: { postReactionId: number; reactionId: number; postId: number; }, { dispatch }) => {
    try {
      await axios.patch(
        `/reactions/${ params.postReactionId }`,
        { reactionId: params.reactionId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(postActions.getPostByIdAsync(params.postId));
      dispatch(
        wrapperActions.showToast({
          toastSeverity: 'success',
          toastMessage: 'Updated',
        }),
      );
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
