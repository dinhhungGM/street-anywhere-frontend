import { createSlice } from '@reduxjs/toolkit';
import * as adminAsyncActions from './adminAsyncActions';

interface IAdminState {
  users: any[];
}
const initialState: IAdminState = {
  users: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminAsyncActions.getAllUsersForManagement.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export default adminSlice;
