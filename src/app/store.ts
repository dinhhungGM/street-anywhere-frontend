import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { authReducer } from '../features/auth/store';
import { landingPageReducer } from '../features/landing-page/store';
import { postReducer } from '../features/posts/store';
import { wrapperReducer } from '../features/wrapper/store';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
  wrapper: wrapperReducer,
  auth: authReducer,
  post: postReducer,
  landingPage: landingPageReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const persistor = persistStore(store);
