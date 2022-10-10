import { createSlice } from '@reduxjs/toolkit';
interface IBookmarksState {}
const initialState: IBookmarksState = {};
const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
});
export default bookmarksSlice;
