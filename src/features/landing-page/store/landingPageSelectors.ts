import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
const selectLandingPageFeature = (rootState: RootState) => rootState.landingPage;

export const selectPosts = createSelector(selectLandingPageFeature, (landingPage) => landingPage.posts);
export const selectCategories = createSelector(selectLandingPageFeature, (landingPage) => landingPage.categories);
export const selectTags = createSelector(selectLandingPageFeature, (landingPage) => landingPage.tags);
