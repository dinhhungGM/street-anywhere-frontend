import { createSlice } from '@reduxjs/toolkit';
interface ITagsState {}
const initialState: ITagsState = {};
const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
});
export default tagsSlice;
