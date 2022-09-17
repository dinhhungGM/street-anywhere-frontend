import { createSlice } from '@reduxjs/toolkit';

export type PostState = {
  posts: any[];
};

const initialState: PostState = {
  posts: [],
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
});

export default postSlice;
