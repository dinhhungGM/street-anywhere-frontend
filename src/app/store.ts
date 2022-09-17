import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/store';
import { landingPageReducer } from '../features/landing-page/store';
import { postReducer } from '../features/posts/store';
import { wrapperReducer } from '../features/wrapper/store';

export const store = configureStore({
  reducer: {
    wrapper: wrapperReducer,
    auth: authReducer,
    post: postReducer,
    landingPage: landingPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
