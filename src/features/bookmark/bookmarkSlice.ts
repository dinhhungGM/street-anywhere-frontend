import { createSlice } from '@reduxjs/toolkit';
import * as bookmarkAsyncActions from './bookmarkAsyncActions';

interface IBookmarkState {}

const initialState: IBookmarkState = {};
const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bookmarkAsyncActions.createBookmark.fulfilled, (state) => {});
    builder.addCase(bookmarkAsyncActions.unBookmark.fulfilled, (state) => {});
  },
});

export default bookmarkSlice;
