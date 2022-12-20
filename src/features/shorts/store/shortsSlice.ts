import { createSlice } from '@reduxjs/toolkit';
import { IPost } from '../../../solutions/models/postModels';
import * as shortAsyncActions from './shortsAsyncActions';
interface IShortsState {
  shorts: IPost[];
}

const initialState: IShortsState = {
  shorts: [],
};

const shortsSlice = createSlice({
  name: 'shorts',
  initialState,
  reducers: {
    resetShorts: (state) => {
      state.shorts = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(shortAsyncActions.getShorts.fulfilled, (state, action) => {
      state.shorts = action.payload;
    });
  },
});

export default shortsSlice;
