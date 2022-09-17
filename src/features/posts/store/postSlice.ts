import { createSlice } from '@reduxjs/toolkit';
import { postActionsAsync } from './postActionsAsync';

export type PostState = {
  tags: any[];
  categories: any[];
};

const initialState: PostState = {
  tags: [],
  categories: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postActionsAsync.getTagsAsync.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
    builder.addCase(postActionsAsync.getCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export default postSlice;
