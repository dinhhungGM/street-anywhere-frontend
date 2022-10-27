import shortsSlice from './store/shortsSlice';
import * as shortsAsyncActions from './store/shortsAsyncActions';
import * as selectors from './store/shortsSelectors';

export const shortsReducer = shortsSlice.reducer;
export const shortsActions = {
  ...shortsAsyncActions,
  ...shortsSlice.actions,
};
export const shortsSelectors = selectors;
export { default as Shorts } from './Shorts';
