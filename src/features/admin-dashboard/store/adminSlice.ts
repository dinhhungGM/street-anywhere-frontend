import { createSlice } from '@reduxjs/toolkit';
import * as adminAsyncActions from './adminAsyncActions';
import { IUserManagement, IRoleManagement, IReactionManagement } from './adminModels';

interface IAdminState {
  users: IUserManagement[];
  roles: IRoleManagement[];
  reactions: IReactionManagement[];
}
const initialState: IAdminState = {
  users: [],
  roles: [],
  reactions: [],
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
    builder.addCase(adminAsyncActions.getAllReactionsForManagement.fulfilled, (state, action) => {
      state.reactions = action.payload;
    });
  },
});

export default adminSlice;
