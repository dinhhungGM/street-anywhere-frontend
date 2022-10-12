import { IComment } from './commentsModels';
import { createSlice } from '@reduxjs/toolkit';
import * as commentsAsyncActions from './commentsAsyncActions';

interface ICommentsState {
  commentCount: number;
  commentList: IComment[];
}

const initialState: ICommentsState = {
  commentCount: 0,
  commentList: [],
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(commentsAsyncActions.getCommentListByPostId.fulfilled, (state, action) => {
      state.commentCount = action.payload.commentCount;
      state.commentList = action.payload.commentList;
    });
  },
});
export default commentsSlice;
