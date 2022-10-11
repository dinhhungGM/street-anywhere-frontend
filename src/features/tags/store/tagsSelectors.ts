import { RootState } from '../../../app/store';
import { createSelector } from '@reduxjs/toolkit';
const selectTagsFeature = (rootState: RootState) => rootState.tags;
export const selectTagList = createSelector(selectTagsFeature, (tagsFeature) => tagsFeature.tagList);
