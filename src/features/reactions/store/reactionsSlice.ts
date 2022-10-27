import { createSlice } from '@reduxjs/toolkit';
import { IReaction } from './reactionModels';
import * as reactionAsyncActions from './reactionsAsyncActions';
interface IReactionState {
  reactionList: IReaction[];
  postsByReaction: any[];
}
const initialState: IReactionState = {
  reactionList: [],
  postsByReaction: [],
};
const reactionsSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(reactionAsyncActions.getReactionList.fulfilled, (state, action) => {
      state.reactionList = action.payload;
    });
    builder.addCase(reactionAsyncActions.getPostsByReaction.fulfilled, (state, action) => {
      state.postsByReaction = action.payload;
    });
  },
});
export default reactionsSlice;
