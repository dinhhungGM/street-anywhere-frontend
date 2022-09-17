import { createSlice } from '@reduxjs/toolkit';
import { landingPageActionsAsync } from './landingPageActionsAsync';

type LandingPageState = {
  posts: any[];
};

const initialState: LandingPageState = {
  posts: [],
};

const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(landingPageActionsAsync.getPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export default landingPageSlice;
