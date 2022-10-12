import tagsSlice from './tagsSlice';
import * as tagModels from './tagModels';
import * as tagSelectors from './tagsSelectors';
import * as tagsAsyncActions from './tagsAsyncActions';

const tagsReducer = tagsSlice.reducer;
const tagsActions = {
  ...tagsSlice.actions,
  ...tagsAsyncActions,
};

export { tagsReducer, tagsActions, tagModels, tagSelectors };
