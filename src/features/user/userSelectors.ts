import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
const selectUserFeature = (rootState: RootState) => rootState.user;

export const selectedFollowedUsers = createSelector(selectUserFeature, (userState) => userState.followedUsers);
export const selectReactedPosts = createSelector(selectUserFeature, (userState) => userState.reactedPosts);
export const selectBookmarkedPosts = createSelector(selectUserFeature, (userState) => userState.bookmarkedPosts);
