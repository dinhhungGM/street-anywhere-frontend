import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../solutions/models/postModels';
import * as profileAsyncActions from './profileDashboardAsyncActions';
import { IBookmarkedPost, IProfileDetail } from './profileDashBoardModels';

interface IProfileState {
  profileDetail: IProfileDetail;
  followers: any[];
  myPosts: IPost[];
  bookmarkedPosts: IBookmarkedPost[];
  followerCount: number;
}

const initialState: IProfileState = {
  profileDetail: null,
  followers: [],
  myPosts: [],
  bookmarkedPosts: [],
  followerCount: 0,
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
    increaseFollowerCount: (state) => {
      state.followerCount++;
    },
    decreaseFollowerCount: (state) => {
      state.followerCount--;
    },
    resetFollowerCount: (state) => {
      state.followerCount = 0;
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

    builder.addCase(profileAsyncActions.getFollowerCount.fulfilled, (state, action) => {
      state.followerCount = action.payload.followerCount;
    });
    builder.addCase(profileAsyncActions.getFollowerCount.rejected, (state, action) => {
      state.followerCount = 0;
    });
  },
});
export const profileSyncActions = profileSlice.actions;
export default profileSlice;
