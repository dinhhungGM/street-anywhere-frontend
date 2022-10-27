import { createAsyncThunk } from '@reduxjs/toolkit';
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
}
export const addReaction = createAsyncThunk(
  'reactions/addReaction',
  async (payload: IAddReactionPayload, { dispatch }) => {
    try {
      await axios.post(`/reactions/post/${payload.postId}`, payload, {
        headers: {
          'content-type': 'application/json',
        },
      });
      dispatch(getReactionList());
    } catch (error) {}
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
