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
        message: error.toString(),
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
      const { data } = await axios.post(`/reactions/post/${ payload.postId }`, payload, {
        headers: {
          'content-type': 'application/json',
        },
      });
      dispatch(
        wrapperActions.showToast({
          toastSeverity: 'success',
          toastMessage: 'Add reaction successfully',
        }),
      );
      dispatch(postActions.addNewReaction({ ...data.value, reactionType }));
    } catch (error) {
      wrapperActions.showNotification({
        typeOfNotification: 'error',
        message: error.toString(),
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
        message: error.toString(),
      }),
    );
  } finally {
    dispatch(wrapperActions.hideLoading());
  }
});

export const removeReaction = createAsyncThunk(
  'reactions/removeReaction',
  async (postReactionId: number, { dispatch }) => {
    try {
      dispatch(wrapperActions.showLoading());
      await axios.delete(`/reactions/${ postReactionId }`);
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

export const changeReaction = createAsyncThunk(
  'reactions/changeReaction',
  async (params: { postReactionId: number; reactionId: number; }, { dispatch }) => {
    try {
      const { data } = await axios.patch(
        `/reactions/${ params.postReactionId }`,
        { reactionId: params.reactionId },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
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
