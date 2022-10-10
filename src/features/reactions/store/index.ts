import reactionsSlice from './reactionsSlice';
import * as reactionsSelectors from './reactionSelectors';

const reactionsReducer = reactionsSlice.reducer;
const reactionsActions = {
  ...reactionsSlice.actions,
};
export { reactionsReducer, reactionsActions, reactionsSelectors };
