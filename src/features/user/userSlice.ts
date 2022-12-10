import { createSlice } from '@reduxjs/toolkit';
import { IBookmarkedPost, IFollowingUser, IReactedPost } from './userModels';
import * as userAsyncActions from './userAsyncActions';

interface IUserState {
  followingUsers: IFollowingUser[] | null;
  reactedPosts: IReactedPost[] | null;
  bookmarkedPosts: IBookmarkedPost[] | null;
}

const initialState: IUserState = {
  followingUsers: null,
  reactedPosts: null,
  bookmarkedPosts: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addNewBookmarkedPost: (state, action) => {
      state.bookmarkedPosts.push(action.payload);
    },
    removeBookmarkedPost: (state, action) => {
      state.bookmarkedPosts = state.bookmarkedPosts.filter((item) => item.bookmarkId !== action.payload.bookmarkId);
    },
    addNewFollowingUser: (state, action) => {
      state.followingUsers.push(action.payload);
    },
    removeFollowingUser: (state, action) => {
      state.followingUsers = state.followingUsers.filter((item) => {
        const { userId, followerId } = action.payload;
        return item.userId !== userId && item.followerId !== followerId;
      });
    },
    resetAllData: (state) => {
      state.bookmarkedPosts = null;
      state.followingUsers = null;
      state.reactedPosts = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userAsyncActions.getFollowingUsers.fulfilled, (state, action) => {
      state.followingUsers = action.payload;
    });
    builder.addCase(userAsyncActions.getBookmarkedPost.fulfilled, (state, action) => {
      state.bookmarkedPosts = action.payload;
    });
    builder.addCase(userAsyncActions.getReactedPost.fulfilled, (state, action) => {
      state.reactedPosts = action.payload;
    });
  },
});

export const userSyncActions = userSlice.actions;
export const userReducer = userSlice.reducer;
