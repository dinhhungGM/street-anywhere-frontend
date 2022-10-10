import { createSlice } from '@reduxjs/toolkit';
interface IReactionState {}
const initialState: IReactionState = {};
const reactionsSlice = createSlice({
  name: 'reactions',
  initialState,
  reducers: {},
});
export default reactionsSlice;
