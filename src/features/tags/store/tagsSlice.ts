import { createSlice } from '@reduxjs/toolkit';
import { ITag } from './tagModels';
import * as tagAsyncActions from './tagsAsyncActions';
interface ITagsState {
  tagList: ITag[];
}
const initialState: ITagsState = {
  tagList: [],
};
const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(tagAsyncActions.getTagList.fulfilled, (state, action) => {
      state.tagList = action.payload;
    });
  },
});
export default tagsSlice;
