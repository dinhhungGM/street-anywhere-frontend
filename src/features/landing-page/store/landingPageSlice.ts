import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../../solutions/models/postModels';
import { landingPageActionsAsync } from './landingPageActionsAsync';

type LandingPageState = {
  posts: IPost[];
  topPosts: IPost[];
  totalPage: number;
};

const initialState: LandingPageState = {
  posts: [],
  topPosts: [],
  totalPage: 0,
};

const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  reducers: {
    resetLandingPage: (state) => {
      state.posts = [];
      state.totalPage = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(landingPageActionsAsync.getPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(landingPageActionsAsync.getPostsAsync.rejected, (state, action) => {
      state.posts = [];
    });
    builder.addCase(landingPageActionsAsync.getTopPosts.fulfilled, (state, action) => {
      state.topPosts = action.payload;
    });
    builder.addCase(landingPageActionsAsync.getTotalPage.fulfilled, (state, action) => {
      state.totalPage = (action.payload as any).totalPage;
    });
    builder.addCase(landingPageActionsAsync.getTotalPage.rejected, (state, action) => {
      state.totalPage = 0;
    });
  },
});

export default landingPageSlice;
