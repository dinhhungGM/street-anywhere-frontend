import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../solutions/models/postModels';
import * as profileAsyncActions from './profileDashboardAsyncActions';
import { IMyPost, IProfileDetail } from './profileDashBoardModels';

interface IProfileState {
  profileDetail: IProfileDetail;
  postsOfCurrentUser: IMyPost[];
  followers: any[];
  myPosts: IPost[];
}

const initialState: IProfileState = {
  profileDetail: null,
  postsOfCurrentUser: [],
  followers: [],
  myPosts: [],
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
      state.myPosts = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(profileAsyncActions.getAllPostsOfCurrentUser.fulfilled, (state, action) => {
      state.postsOfCurrentUser = action.payload;
    });
    builder.addCase(profileAsyncActions.getProfileOfUser.fulfilled, (state, action) => {
      state.profileDetail = action.payload;
    });
    builder.addCase(profileAsyncActions.getProfileOfUser.rejected, (state, action) => {
      state.profileDetail = null;
    });
    builder.addCase(profileAsyncActions.getFollowers.fulfilled, (state, action) => {
      state.followers = action.payload;
    });
    builder.addCase(profileAsyncActions.getPostsOfUser.fulfilled, (state, action) => {
      state.myPosts = action.payload;
    });
  },
});
export const profileSyncActions = profileSlice.actions;
export default profileSlice;
