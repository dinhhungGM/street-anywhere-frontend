import { postActionsAsync } from './postActionsAsync';
import postSlice from './postSlice';

const { actions, reducer: postReducer } = postSlice;
const postActions = {
  ...actions,
  ...postActionsAsync,
};

export { postActions, postReducer };

