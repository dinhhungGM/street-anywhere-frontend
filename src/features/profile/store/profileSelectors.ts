import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

const selectProfileFeature = (rootState: RootState) => rootState.profile;
export const selectMyPosts = createSelector(selectProfileFeature, (profile) => profile.myPosts);
