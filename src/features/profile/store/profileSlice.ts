import { createSlice } from '@reduxjs/toolkit';
interface IProfileState {}
const initialState: IProfileState = {};
const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
});

export default profileSlice;