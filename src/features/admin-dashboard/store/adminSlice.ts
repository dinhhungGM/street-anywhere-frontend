import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../../solutions/models/postModels';
import * as adminAsyncActions from './adminAsyncActions';
import {
  ICategoryManagement,
  IHashTagManagement,
  IReactionManagement,
  IRoleManagement,
  ISystemStats,
  IUserManagement,
  IUserMostFollower,
  IUserMostPost,
  IUsersMostBookmark,
  IUsersMostInteraction,
} from './adminModels';

interface IAdminState {
  users: IUserManagement[];
  roles: IRoleManagement[];
  reactions: IReactionManagement[];
  categories: ICategoryManagement[];
  hashTags: IHashTagManagement[];
  usersByYears: any;
  postsByYears: any;
  userMostFollower: IUserMostFollower[];
  userMostPost: IUserMostPost[];
  sysStats: ISystemStats;
  usersMostInteractions: IUsersMostInteraction[];
  usersMostBookmarks: IUsersMostBookmark[];
  posts: IPost[];
}
const initialState: IAdminState = {
  users: [],
  roles: [],
  reactions: [],
  categories: [],
  hashTags: [],
  usersByYears: null,
  postsByYears: null,
  userMostFollower: [],
  userMostPost: [],
  sysStats: null,
  posts: [],
  usersMostInteractions: [],
  usersMostBookmarks: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetStatsData: (state) => {
      state.postsByYears = [];
      state.usersByYears = [];
      state.userMostPost = [];
      state.userMostFollower = [];
      state.sysStats = null;
      state.usersMostInteractions = [];
      state.usersMostBookmarks = [];
    },
    resetPostManagement: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminAsyncActions.getAllUsersForManagement.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(adminAsyncActions.getAllUsersForManagement.rejected, (state, action) => {
      state.users = [];
    });

    builder.addCase(adminAsyncActions.getAllRolesForManagement.fulfilled, (state, action) => {
      state.roles = action.payload;
    });
    builder.addCase(adminAsyncActions.getAllRolesForManagement.rejected, (state, action) => {
      state.roles = [];
    });

    builder.addCase(adminAsyncActions.getAllReactionsForManagement.fulfilled, (state, action) => {
      state.reactions = action.payload;
    });
    builder.addCase(adminAsyncActions.getAllReactionsForManagement.rejected, (state, action) => {
      state.reactions = [];
    });

    builder.addCase(adminAsyncActions.getAllCategoriesForManagement.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(adminAsyncActions.getAllCategoriesForManagement.rejected, (state, action) => {
      state.categories = [];
    });

    builder.addCase(adminAsyncActions.getAllHashTagsForManagement.fulfilled, (state, action) => {
      state.hashTags = action.payload;
    });
    builder.addCase(adminAsyncActions.getAllHashTagsForManagement.rejected, (state, action) => {
      state.hashTags = [];
    });

    builder.addCase(adminAsyncActions.getStatsOfUserByYear.fulfilled, (state, action) => {
      state.usersByYears = action.payload;
    });
    builder.addCase(adminAsyncActions.getStatsOfUserByYear.rejected, (state, action) => {
      state.usersByYears = [];
    });

    builder.addCase(adminAsyncActions.getStatsOfPostsByYear.fulfilled, (state, action) => {
      state.postsByYears = action.payload;
    });
    builder.addCase(adminAsyncActions.getStatsOfPostsByYear.rejected, (state, action) => {
      state.postsByYears = [];
    });

    builder.addCase(adminAsyncActions.getTopUsersMostFollower.fulfilled, (state, action) => {
      state.userMostFollower = action.payload;
    });
    builder.addCase(adminAsyncActions.getTopUsersMostFollower.rejected, (state, action) => {
      state.userMostFollower = [];
    });

    builder.addCase(adminAsyncActions.getTopUserMostPost.fulfilled, (state, action) => {
      state.userMostPost = action.payload;
    });
    builder.addCase(adminAsyncActions.getTopUserMostPost.rejected, (state, action) => {
      state.userMostPost = [];
    });

    builder.addCase(adminAsyncActions.getSystemStats.fulfilled, (state, action) => {
      state.sysStats = action.payload;
    });
    builder.addCase(adminAsyncActions.getSystemStats.rejected, (state, action) => {
      state.sysStats = null;
    });

    builder.addCase(adminAsyncActions.getPostsForManagement.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(adminAsyncActions.getPostsForManagement.rejected, (state, action) => {
      state.posts = [];
    });

    builder.addCase(adminAsyncActions.getTopUsersMostInteractions.fulfilled, (state, action) => {
      state.usersMostInteractions = action.payload;
    });
    builder.addCase(adminAsyncActions.getTopUsersMostInteractions.rejected, (state, action) => {
      state.usersMostInteractions = [];
    });

    builder.addCase(adminAsyncActions.getTopUsersMostBookmarks.fulfilled, (state, action) => {
      state.usersMostBookmarks = action.payload;
    });
    builder.addCase(adminAsyncActions.getTopUsersMostBookmarks.rejected, (state, action) => {
      state.usersMostBookmarks = [];
    });
  },
});

export default adminSlice;
