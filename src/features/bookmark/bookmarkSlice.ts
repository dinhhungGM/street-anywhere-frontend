import { createSlice } from '@reduxjs/toolkit';

interface IBookmarkState {}

const initialState: IBookmarkState = {};
const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default bookmarkSlice;
