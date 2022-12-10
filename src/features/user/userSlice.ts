import { createSlice } from '@reduxjs/toolkit';
import { IBookmarkedPost, IFollowedUser, IReactedPost } from './userModels';

interface IUserState {
  followedUsers: IFollowedUser[] | null;
  reactedPosts: IReactedPost[] | null;
  bookmarkedPosts: IBookmarkedPost[] | null;
}

const initialState: IUserState = {
  followedUsers: null,
  reactedPosts: null,
  bookmarkedPosts: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const userSyncActions = userSlice.actions;
export const userReducer = userSlice.reducer;