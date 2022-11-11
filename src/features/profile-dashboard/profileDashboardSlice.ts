import { createSlice } from '@reduxjs/toolkit';
import * as profileAsyncActions from './profileDashboardAsyncActions';

interface IProfileState {
  postsOfCurrentUser: any[];
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
