import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const selectProfileFeature = (rootState: RootState) => rootState.profile;
export const selectPostsOfCurrentUser = createSelector(selectProfileFeature, (profile) => profile.postsOfCurrentUser);
