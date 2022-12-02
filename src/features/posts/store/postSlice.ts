import { createSlice } from '@reduxjs/toolkit';
import { IBookmarkDetail, IPost, IPostReactionDetails } from '../../../solutions/models/postModels';
import { postActionsAsync } from './postActionsAsync';

export interface PostState {
  selectedPost: IPost;
  bookmark: { bookmarkCount?: number; posts: IPost[]; };
  postReactionDetails: IPostReactionDetails;
  bookmarkDetails: { bookmarkCount?: number; bookmarkDetails?: IBookmarkDetail[]; };
}

const initialState: PostState = {
  selectedPost: null,
  bookmark: null,
  postReactionDetails: null,
  bookmarkDetails: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPostDetail: (state) => {
      state.selectedPost = null;
      state.bookmarkDetails = null;
      state.bookmarkDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postActionsAsync.getPostByIdAsync.fulfilled, (state, action) => {
      state.selectedPost = action.payload;
    });
    builder.addCase(postActionsAsync.getStoredPostByUserId.fulfilled, (state, action) => {
      state.bookmark = action.payload;
    });
    builder.addCase(postActionsAsync.getReactionDetailsByPostIdAsync.fulfilled, (state, action) => {
      state.postReactionDetails = action.payload;
    });
    builder.addCase(postActionsAsync.deletePostReaction.fulfilled, (state, action) => {
      state.postReactionDetails = null;
    });
    builder.addCase(postActionsAsync.getBookmarkDetailsByPostId.fulfilled, (state, action) => {
      state.bookmarkDetails = action.payload;
    });
  },
});

export default postSlice;
