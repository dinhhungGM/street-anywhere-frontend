import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../../solutions/models/postModels';
import { postActionsAsync } from './postActionsAsync';

export interface PostState {
  selectedPost: IPost;
}

const initialState: PostState = {
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    resetPostDetail: (state) => {
      state.selectedPost = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postActionsAsync.getPostByIdAsync.fulfilled, (state, action) => {
      state.selectedPost = action.payload;
    });
  },
});

export default postSlice;
