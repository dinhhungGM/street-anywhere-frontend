import tagsSlice from './tagsSlice';

const tagsReducer = tagsSlice.reducer;
const tagsActions = {
  ...tagsSlice.actions,
};

export { tagsReducer, tagsActions };
