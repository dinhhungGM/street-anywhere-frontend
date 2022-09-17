import { postActionsAsync } from './postActionsAsync';
import postSlice from './postSlice';
import * as postSelectors from './postSelectors';

const { actions, reducer: postReducer } = postSlice;
const postActions = {
  ...actions,
  ...postActionsAsync,
};

export { postActions, postReducer, postSelectors };

