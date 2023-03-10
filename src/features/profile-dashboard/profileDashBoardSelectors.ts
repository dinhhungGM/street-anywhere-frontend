import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const selectProfileFeature = (rootState: RootState) => rootState.profile;
export const selectProfileDetail = createSelector(
  selectProfileFeature,
  (profile) => profile.profileDetail,
);
export const selectFollowers = createSelector(selectProfileFeature, (profile) => profile.followers);
export const selectMyPosts = createSelector(selectProfileFeature, (profile) => profile.myPosts);
export const selectBookmarkedPosts = createSelector(
  selectProfileFeature,
  (profile) => profile.bookmarkedPosts,
);
export const selectFollowerCount = createSelector(
  selectProfileFeature,
  (profile) => profile.followerCount,
);
export const selectFollowings = createSelector(selectProfileFeature, (profile) => profile.followings);
