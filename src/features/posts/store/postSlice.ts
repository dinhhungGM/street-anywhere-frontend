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
    },
    addBookmark: (state, action) => {
      const { bookmarkId, userId } = action.payload;
      const { bookmarks } = state.selectedPost;
      state.selectedPost = {
        ...state.selectedPost,
        bookmarks: [...bookmarks, { bookmarkId, userId }],
      };
    },
    removeBookmark: (state, action) => {
      const newBookmarks = state.selectedPost.bookmarks.filter(
        (item) => item.bookmarkId !== action.payload.bookmarkId,
      );
      state.selectedPost.bookmarks = newBookmarks;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postActionsAsync.getPostByIdAsync.fulfilled, (state, action) => {
      state.selectedPost = action.payload;
    });
    builder.addCase(postActionsAsync.getPostByIdAsync.rejected, (state, action) => {
      state.selectedPost = null;
    });
    builder.addCase(postActionsAsync.getPostRelevantToCurrentPost.fulfilled, (state, action) => {
      state.relevantPost = action.payload;
    });
    builder.addCase(postActionsAsync.getPostRelevantToCurrentPost.rejected, (state, action) => {
      state.relevantPost = null;
    });
  },
});

export default postSlice;
