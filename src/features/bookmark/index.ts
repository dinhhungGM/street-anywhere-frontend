import bookmarkSlice from './bookmarkSlice';
import * as bookmarkAsyncActions from './bookmarkAsyncActions';

const bookmarkReducer = bookmarkSlice.reducer;
const bookmarkActions = {
  ...bookmarkSlice.actions,
  ...bookmarkAsyncActions,
};

export { bookmarkReducer, bookmarkActions };
