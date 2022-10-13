import reactionsSlice from './reactionsSlice';
import * as reactionsSelectors from './reactionSelectors';
import * as reactionsModels from './reactionModels';
import * as reactionAsyncActions from './reactionsAsyncActions';

const reactionsReducer = reactionsSlice.reducer;
const reactionsActions = {
  ...reactionsSlice.actions,
  ...reactionAsyncActions,
};
export { reactionsReducer, reactionsActions, reactionsModels, reactionsSelectors };
