import tagsSlice from './tagsSlice';
import * as TagModels from './tagModels';
import * as TagSelectors from './tagsSelectors';

const tagsReducer = tagsSlice.reducer;
const tagsActions = {
  ...tagsSlice.actions,
};

export { tagsReducer, tagsActions, TagModels, TagSelectors };
