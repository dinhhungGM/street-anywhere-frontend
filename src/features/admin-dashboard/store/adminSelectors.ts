import { RootState } from '../../../app/store';
import { createSelector } from '@reduxjs/toolkit';

const selectAdminStateFeature = (rootState: RootState) => rootState.admin;
export const selectAllUsers = createSelector(selectAdminStateFeature, (admin) => admin.users);
export const selectAllRoles = createSelector(selectAdminStateFeature, (admin) => admin.roles);
export const selectAllReactions = createSelector(
  selectAdminStateFeature,
  (admin) => admin.reactions,
);
export const selectAllCategories = createSelector(
  selectAdminStateFeature,
  (admin) => admin.categories,
);
export const selectAllHashTags = createSelector(selectAdminStateFeature, (admin) => admin.hashTags);
export const selectUsersByYears = createSelector(
  selectAdminStateFeature,
  (admin) => admin.usersByYears,
);
export const selectPostsByYears = createSelector(
  selectAdminStateFeature,
  (admin) => admin.postsByYears,
);
export const selectTopUserMostFollower = createSelector(
  selectAdminStateFeature,
  (admin) => admin.userMostFollower,
);
export const selectTopUserMostPost = createSelector(
  selectAdminStateFeature,
  (admin) => admin.userMostPost,
);
export const selectSysStats = createSelector(selectAdminStateFeature, (admin) => admin.sysStats);
export const selectPosts = createSelector(selectAdminStateFeature, (admin) => admin.posts);
