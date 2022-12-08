import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

const selectPostFeature = (rootState: RootState) => rootState.post;
export const selectSelectedPost = createSelector(selectPostFeature, (postState) => postState.selectedPost);
