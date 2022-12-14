import { createSlice } from '@reduxjs/toolkit';
import * as profileAsyncActions from './profileDashboardAsyncActions';
import { IMyPost, IProfileDetail } from './profileDashBoardModels';

interface IProfileState {
  profileDetail: IProfileDetail;
  postsOfCurrentUser: IMyPost[];
  followers: any[];
}

const initialState: IProfileState = {
  profileDetail: null,
  postsOfCurrentUser: [],
  followers: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileAsyncActions.getAllPostsOfCurrentUser.fulfilled, (state, action) => {
      state.postsOfCurrentUser = action.payload;
    });
    builder.addCase(profileAsyncActions.getProfileOfUser.fulfilled, (state, action) => {
      state.profileDetail = action.payload;
    });
    builder.addCase(profileAsyncActions.getFollowers.fulfilled, (state, action) => {
      state.followers = action.payload;
    });
  },
});
export default profileSlice;
