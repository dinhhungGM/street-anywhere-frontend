import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from './categoriesModels';
import * as categoriesAsyncActions from './categoriesAsyncActions';
interface ICategoriesState {
  categoryList: ICategory[];
}
const initialState: ICategoriesState = {
  categoryList: [],
};
const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoriesAsyncActions.getCategoryList.fulfilled, (state, action) => {
      state.categoryList = action.payload;
    });
  },
});
export default categoriesSlice;
