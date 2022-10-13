import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../../solutions/models/postModels';
import * as profileAsyncActions from './profileAsyncActions';
interface IProfileState {
  myPosts: IPost[];
}
const initialState: IProfileState = {
  myPosts: [],
};
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileAsyncActions.getMyPost.fulfilled, (state, action) => {
      state.myPosts = action.payload;
    });
  },
});

export default profileSlice;
