import commentsSlice from './commentsSlice';
import * as commentsSelectors from './commentsSelectors';
import * as commentsModels from './commentsModels';
import * as commentsAsyncActions from './commentsAsyncActions';

const commentsReducer = commentsSlice.reducer;
const commentsActions = {
  ...commentsSlice.actions,
  ...commentsAsyncActions,
};

export { commentsReducer, commentsActions, commentsSelectors, commentsModels };
