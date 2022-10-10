import { createSlice } from '@reduxjs/toolkit';
interface ICategoriesState {}
const initialState: ICategoriesState = {};
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
});
export default categoriesSlice;
