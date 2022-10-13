import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';

const selectPostFeature = (rootState: RootState) => rootState.post;
export const selectSelectedPost = createSelector(selectPostFeature, (postState) => postState.selectedPost);
export const selectBookmark = createSelector(selectPostFeature, (postState) => postState.bookmark);
export const selectPostReactionDetails = createSelector(
  selectPostFeature,
  (postState) => postState.postReactionDetails,
);
export const selectBookmarkDetails = createSelector(selectPostFeature, (postState) => postState.bookmarkDetails);
