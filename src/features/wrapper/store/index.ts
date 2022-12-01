import wrapperSlice from './wrapperSlice';
import * as wrapperSelectors from './wrapperSelectors';
import * as wrapperAsyncActions from './wrapperAsyncActions';
import * as wrapperModels from './wrapperModels';

const { actions, reducer: wrapperReducer } = wrapperSlice;
const wrapperActions = {
  ...actions,
  ...wrapperAsyncActions,
};
export { wrapperActions, wrapperReducer, wrapperSelectors, wrapperModels };
