import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../../solutions/models/postModels';
import { landingPageActionsAsync } from './landingPageActionsAsync';

type LandingPageState = {
  posts: IPost[];
  topPosts: IPost[];
};

const initialState: LandingPageState = {
  posts: [],
  topPosts: [],
};

const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(landingPageActionsAsync.getPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(landingPageActionsAsync.getTopPosts.fulfilled, (state, action) => {
      state.topPosts = action.payload;
    });
  },
});

export default landingPageSlice;
