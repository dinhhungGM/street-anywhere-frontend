import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import sessionStorage from 'redux-persist/lib/storage/session';
import { adminReducer } from '../features/admin-dashboard/store';
import { authReducer } from '../features/auth/store';
import { bookmarkReducer } from '../features/bookmark';
import { categoriesReducer } from '../features/categories/store';
import { commentsReducer } from '../features/comments/store';
import { landingPageReducer } from '../features/landing-page/store';
import { postReducer } from '../features/posts/store';
import { profileReducer } from '../features/profile-dashboard';
import { reactionsReducer } from '../features/reactions/store';
import { shortsReducer } from '../features/shorts';
import { tagsReducer } from '../features/tags/store';
import { userReducer } from '../features/user';
import { wrapperReducer } from '../features/wrapper/store';

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
};
const combineReducer = combineReducers({
  wrapper: wrapperReducer,
  auth: authReducer,
  post: postReducer,
  landingPage: landingPageReducer,
  profile: profileReducer,
  reactions: reactionsReducer,
  categories: categoriesReducer,
  tags: tagsReducer,
  comments: commentsReducer,
  admin: adminReducer,
  shorts: shortsReducer,
  bookmark: bookmarkReducer,
  user: userReducer,
});

const rootReducer = (state, action) => {
  return combineReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof combineReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export const persistor = persistStore(store);
