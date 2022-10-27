import { RootState } from '../../../app/store';
import { createSelector } from '@reduxjs/toolkit';
const selectShortsFeature = (rootState: RootState) => rootState.shorts;
export const selectShorts = createSelector(selectShortsFeature, (shorts) => shorts.shorts);
