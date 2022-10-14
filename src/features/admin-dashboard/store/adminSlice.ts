import { createSlice } from '@reduxjs/toolkit';
import * as adminAsyncActions from './adminAsyncActions';
import { IUserManagement, IRoleManagement } from './adminModels';

interface IAdminState {
  users: IUserManagement[];
  roles: IRoleManagement[];
}
const initialState: IAdminState = {
  users: [],
  roles: [],
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(adminAsyncActions.getAllUsersForManagement.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(adminAsyncActions.getAllRolesForManagement.fulfilled, (state, action) => {
      state.roles = action.payload;
    });
  },
});

export default adminSlice;
