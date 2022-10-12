import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authReducer } from '../features/auth/store';
import { bookmarksReducer } from '../features/bookmarks/store/index';
import { categoriesReducer } from '../features/categories/store';
import { commentsReducer } from '../features/comments/store';
import { landingPageReducer } from '../features/landing-page/store';
import { postReducer } from '../features/posts/store';
import { profileReducer } from '../features/profile/store/index';
import { reactionsReducer } from '../features/reactions/store';
import { tagsReducer } from '../features/tags/store';
import { wrapperReducer } from '../features/wrapper/store';

const persistConfig = {
  key: 'root',
  storage,
};
const rootReducer = combineReducers({
  wrapper: wrapperReducer,
  auth: authReducer,
  post: postReducer,
  landingPage: landingPageReducer,
  profile: profileReducer,
  bookmarks: bookmarksReducer,
  reactions: reactionsReducer,
  categories: categoriesReducer,
  tags: tagsReducer,
  comments: commentsReducer
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
