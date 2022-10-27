import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
const selectLandingPageFeature = (rootState: RootState) => rootState.landingPage;

export const selectPosts = createSelector(selectLandingPageFeature, (landingPage) => landingPage.posts);
export const selectTopPosts = createSelector(selectLandingPageFeature, (landingPage) => landingPage.topPosts);
