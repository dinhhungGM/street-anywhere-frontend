import { createSlice } from '@reduxjs/toolkit';
import * as profileAsyncActions from './profileDashboardAsyncActions';
import { IMyPost } from './profileDashBoardModels';

interface IProfileState {
  postsOfCurrentUser: IMyPost[];
}

const initialState: IProfileState = {
  postsOfCurrentUser: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileAsyncActions.getAllPostsOfCurrentUser.fulfilled, (state, action) => {
      state.postsOfCurrentUser = action.payload;
    });
  },
});
export default profileSlice;
