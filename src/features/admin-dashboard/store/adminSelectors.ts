import { RootState } from '../../../app/store';
import { createSelector } from '@reduxjs/toolkit';
const selectAdminStateFeature = (rootState: RootState) => rootState.admin;
export const selectAllUsers = createSelector(selectAdminStateFeature, (admin) => admin.users);
export const selectAllRoles = createSelector(selectAdminStateFeature, (admin) => admin.roles);
