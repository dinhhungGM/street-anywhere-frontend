import { IComment } from './commentsModels';
import { createSlice } from '@reduxjs/toolkit';
import * as commentsAsyncActions from './commentsAsyncActions';

interface ICommentsState {
  commentList: IComment[];
}

const initialState: ICommentsState = {
  commentList: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(commentsAsyncActions.getCommentListByPostId.fulfilled, (state, action) => {
      state.commentList = action.payload;
    });
  },
});
export default commentsSlice;
