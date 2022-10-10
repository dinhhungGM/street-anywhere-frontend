import bookmarksSlice from './bookmarksSlice';
import * as bookmarksSelectors from './bookmarksSelectors';

const bookmarksReducer = bookmarksSlice.reducer;
const bookmarksActions = {
  ...bookmarksSlice.actions,
};
export { bookmarksReducer, bookmarksActions, bookmarksSelectors };
