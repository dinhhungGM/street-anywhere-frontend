import { createSlice } from '@reduxjs/toolkit';
import { IReaction } from './reactionModels';
import * as reactionAsyncActions from './reactionsAsyncActions';
interface IReactionState {
  reactionList: IReaction[];
}
const initialState: IReactionState = {
  reactionList: [],
};
const reactionsSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(reactionAsyncActions.getReactionList.fulfilled, (state, action) => {
      state.reactionList = action.payload;
    });
  },
});
export default reactionsSlice;
