import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from '../features/sign-in/store';
import { wrapperReducer } from '../features/wrapper/store';

export const store = configureStore({
  reducer: {
    wrapper: wrapperReducer,
    auth: authReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
