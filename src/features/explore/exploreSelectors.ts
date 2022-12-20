import { RootState } from '../../app/store';
import { createSelector } from '@reduxjs/toolkit';
const selectExploreFeature = (state: RootState) => state.explore;

export const selectAroundHereData = createSelector(
  selectExploreFeature,
  (exploreState) => exploreState.aroundHereData,
);
