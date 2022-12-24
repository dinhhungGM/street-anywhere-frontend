import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../solutions/models/postModels';
import * as profileAsyncActions from './profileDashboardAsyncActions';
import { IBookmarkedPost, IProfileDetail } from './profileDashBoardModels';

interface IProfileState {
  profileDetail: IProfileDetail;
  followers: any[];
  myPosts: IPost[];
  bookmarkedPosts: IBookmarkedPost[];
}

const initialState: IProfileState = {
  profileDetail: null,
  followers: [],
  myPosts: [],
  bookmarkedPosts: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    removeDeletedPost: (state, action) => {
      const { postId } = action.payload;
      state.myPosts = state.myPosts.filter((post) => post.id !== postId);
    },
    resetMyPosts: (state) => {
      state.myPosts = [];
    },
    resetFollowers: (state) => {
      state.followers = [];
    },
    resetProfileDetail: (state) => {
      state.profileDetail = null;
    },
    removeBookmarkedPost: (state, action) => {
      const { bookmarkId } = action.payload;
      state.bookmarkedPosts = state.bookmarkedPosts.filter(
        (post) => post.bookmarkId !== +bookmarkId,
      );
    },
    resetListBookmarkedPosts: (state) => {
      state.bookmarkedPosts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(profileAsyncActions.getProfileOfUser.fulfilled, (state, action) => {
      state.profileDetail = action.payload;
    });
    builder.addCase(profileAsyncActions.getProfileOfUser.rejected, (state, action) => {
      state.profileDetail = null;
    });

    builder.addCase(profileAsyncActions.getFollowers.fulfilled, (state, action) => {
      state.followers = action.payload;
    });
    builder.addCase(profileAsyncActions.getFollowers.rejected, (state, action) => {
      state.followers = [];
    });

    builder.addCase(profileAsyncActions.getPostsOfUser.fulfilled, (state, action) => {
      state.myPosts = action.payload;
    });
    builder.addCase(profileAsyncActions.getPostsOfUser.rejected, (state, action) => {
      state.myPosts = [];
    });

    builder.addCase(profileAsyncActions.getListBookmarkedPosts.fulfilled, (state, action) => {
      state.bookmarkedPosts = action.payload;
    });
    builder.addCase(profileAsyncActions.getListBookmarkedPosts.rejected, (state, action) => {
      state.bookmarkedPosts = [];
    });
  },
});
export const profileSyncActions = profileSlice.actions;
export default profileSlice;
