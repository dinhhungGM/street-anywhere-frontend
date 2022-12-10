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
    addBookmark: (state, action) => {
      const { bookmarkId, userId } = action.payload;
      const { bookmarks } = state.selectedPost;
      state.selectedPost = {
        ...state.selectedPost,
        bookmarks: [...bookmarks, { bookmarkId, userId }],
      };
    },
    removeBookmark: (state, action) => {
      const newBookmarks = state.selectedPost.bookmarks.filter((item) => item.bookmarkId !== action.payload.bookmarkId);
      state.selectedPost.bookmarks = newBookmarks;
    },
    addNewReaction: (state, action) => {
      const reactions = state.selectedPost.reactions;
      const newReaction = action.payload;
      const updatingReaction = reactions.find((item) => item.reactionType === newReaction.reactionType);
      updatingReaction.reactedUsers.push({ postReactionId: newReaction.id, userId: newReaction.userId });
      state.selectedPost = {
        ...state.selectedPost,
        reactions: [...reactions, updatingReaction],
      };
    },
    updateReaction: (state, action) => {
      const newData = action.payload;
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
