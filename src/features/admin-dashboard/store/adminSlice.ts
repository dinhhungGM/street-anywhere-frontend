import { createSlice } from '@reduxjs/toolkit';
import * as adminAsyncActions from './adminAsyncActions';
import { IUserManagement, IRoleManagement, IReactionManagement, ICategoryManagement, IHashTagManagement } from './adminModels';

interface IAdminState {
  users: IUserManagement[];
  roles: IRoleManagement[];
  reactions: IReactionManagement[];
  categories: ICategoryManagement[];
  hashTags: IHashTagManagement[]
}
const initialState: IAdminState = {
  users: [],
  roles: [],
  reactions: [],
  categories: [],
  hashTags: []
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
    builder.addCase(adminAsyncActions.getAllCategoriesForManagement.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(adminAsyncActions.getAllHashTagsForManagement.fulfilled, (state, action) => {
      state.hashTags = action.payload;
    });
  },
});

export default adminSlice;
