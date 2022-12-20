import { createSlice } from '@reduxjs/toolkit';
import * as exploreAsyncActions from './exploreAsyncActions';
import { IExploreState } from './exploreModels';

const initialState: IExploreState = {
  aroundHereData: null,
};

const exploreSlice = createSlice({
  name: 'explore',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(exploreAsyncActions.findAroundHereData.fulfilled, (state, action) => {
      state.aroundHereData = action.payload;
    });
    builder.addCase(exploreAsyncActions.findAroundHereData.rejected, (state) => {
      state.aroundHereData = null;
    });
  },
});

export const exploreSyncActions = exploreSlice.actions;
export const exploreReducer = exploreSlice.reducer;
