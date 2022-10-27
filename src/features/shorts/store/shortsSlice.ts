import { createSlice } from '@reduxjs/toolkit';
import * as shortAsyncActions from './shortsAsyncActions';
interface IShortsState {
  shorts: any[];
}

const initialState: IShortsState = {
  shorts: [],
};

const shortsSlice = createSlice({
  name: 'shorts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(shortAsyncActions.getShorts.fulfilled, (state, action) => {
      state.shorts = action.payload;
    });
  },
});

export default shortsSlice;
