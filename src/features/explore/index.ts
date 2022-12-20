import { exploreReducer, exploreSyncActions } from './exploreSlice';
import * as exploreAsyncActions from './exploreAsyncActions';

const exploreActions = {
  ...exploreSyncActions,
  ...exploreAsyncActions,
};
export { default as Explore } from './Explore';
export { exploreReducer, exploreActions };
