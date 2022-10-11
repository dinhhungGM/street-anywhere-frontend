import reactionsSlice from './reactionsSlice';
import * as reactionsSelectors from './reactionSelectors';
import * as reactionsModels from './reactionModels';

const reactionsReducer = reactionsSlice.reducer;
const reactionsActions = {
  ...reactionsSlice.actions,
};
export { reactionsReducer, reactionsActions, reactionsModels, reactionsSelectors };
