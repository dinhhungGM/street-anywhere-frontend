import { RootState } from '../../../app/store';
import { createSelector } from '@reduxjs/toolkit';

const selectCommentsFeature = (rootState: RootState) => rootState.comments;
export const selectCommentList = createSelector(selectCommentsFeature, (commentsFeature) => commentsFeature.commentList);
