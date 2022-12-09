import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../../solutions/models/postModels';
import { postActionsAsync } from './postActionsAsync';

export interface PostState {
  selectedPost: IPost;
  relevantPost: IPost[] | null;
}

const initialState: PostState = {
  selectedPost: null,
  relevantPost: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPostDetail: (state) => {
      state.selectedPost = null;
      state.selectedPost = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postActionsAsync.getPostByIdAsync.fulfilled, (state, action) => {
      state.selectedPost = action.payload;
    });
    builder.addCase(postActionsAsync.getPostRelevantToCurrentPost.fulfilled, (state, action) => {
      state.relevantPost = action.payload;
    });
  },
});

export default postSlice;
