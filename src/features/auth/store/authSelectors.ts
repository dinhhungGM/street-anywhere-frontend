import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../app/store';
import { AuthState } from './authSlice';

const selectAuthFeature = (rootState: RootState): AuthState => rootState.auth;
export const selectCurrentUser = createSelector(selectAuthFeature, (auth) => auth.currentUser);
