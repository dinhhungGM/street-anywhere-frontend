import { createSlice } from '@reduxjs/toolkit';
import { landingPageActionsAsync } from './landingPageActionsAsync';
import { IPost, ICategory, ITag } from '../../../solutions/models/postModels';

type LandingPageState = {
  posts: IPost[];
  categories: ICategory[];
  tags: ITag[];
};

const initialState: LandingPageState = {
  posts: [],
  categories: [],
  tags: [],
};

const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(landingPageActionsAsync.getPostsAsync.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(landingPageActionsAsync.getAllCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(landingPageActionsAsync.getAllTagsAsync.fulfilled, (state, action) => {
      state.tags = action.payload;
    });
  },
});

export default landingPageSlice;
