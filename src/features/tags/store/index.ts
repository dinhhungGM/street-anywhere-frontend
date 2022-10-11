import tagsSlice from './tagsSlice';
import * as tagModels from './tagModels';
import * as tagSelectors from './tagsSelectors';

const tagsReducer = tagsSlice.reducer;
const tagsActions = {
  ...tagsSlice.actions,
};

export { tagsReducer, tagsActions, tagModels, tagSelectors };
