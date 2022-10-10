import wrapperSlice from './wrapperSlice';
import * as wrapperSelectors from './wrapperSelectors';

const { actions: wrapperActions, reducer: wrapperReducer } = wrapperSlice;
export { wrapperActions, wrapperReducer, wrapperSelectors };
