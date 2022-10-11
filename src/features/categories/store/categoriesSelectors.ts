import { RootState } from '../../../app/store';
import { createSelector } from '@reduxjs/toolkit';

const selectCategoriesFeature = (rootState: RootState) => rootState.categories;
export const selectCategoryList = createSelector(
  selectCategoriesFeature,
  (categoriesFeature) => categoriesFeature.categoryList,
);
