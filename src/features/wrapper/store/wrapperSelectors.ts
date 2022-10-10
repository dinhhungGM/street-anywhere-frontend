import { createSelector } from 'reselect';
import { RootState } from '../../../app/store';
const selectWrapperFeature = (state: RootState) => state.wrapper;

export const selectIsLoading = createSelector(selectWrapperFeature, (wrapper) => wrapper.isLoading);
export const selectIsShowNotification = createSelector(selectWrapperFeature, (wrapper) => wrapper.isShowNotification);
export const selectNotificationInfo = createSelector(selectWrapperFeature, (wrapper) => wrapper.notificationInfo);
