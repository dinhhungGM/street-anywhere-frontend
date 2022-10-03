import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

const selectPostFeature = (rootState: RootState) => rootState.post;
export const selectTags = createSelector(selectPostFeature, (postState): any[] => postState.tags);
export const selectCategories = createSelector(selectPostFeature, (postState): any[] => postState.categories);
export const selectSelectedPost = createSelector(selectPostFeature, (postState) => postState.selectedPost);
export const selectMyPosts = createSelector(selectPostFeature, (postState) => postState.myPosts);
