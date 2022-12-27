import { RootState } from '../../../app/store';
import { createSelector } from 'reselect';
const selectReactionsFeature = (rootState: RootState) => rootState.reactions;
export const selectReactionList = createSelector(
  selectReactionsFeature,
  (reactionState) => reactionState.reactionList,
);
