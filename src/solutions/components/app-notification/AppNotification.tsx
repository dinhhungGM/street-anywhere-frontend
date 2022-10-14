import React, { useEffect } from 'react';
import SweetAlert from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { wrapperActions, wrapperSelectors } from '../../../features/wrapper/store';

const AppNotification = () => {
  const isShowNotification = useAppSelector(wrapperSelectors.selectIsShowNotification);
  const info = useAppSelector(wrapperSelectors.selectNotificationInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hideNotification = (): void => {
      dispatch(wrapperActions.hideNotification());
    };
    if (isShowNotification) {
      switch (info.typeOfNotification) {
        case 'success': {
          SweetAlert.fire({
            title: 'Success',
            icon: 'success',
            text: info.message,
          }).then(hideNotification);
          break;
        }
        case 'error': {
          SweetAlert.fire({
            title: 'Error',
            icon: 'error',
            text: info.message,
          }).then(hideNotification);
          break;
        }
        case 'warning': {
          SweetAlert.fire({
            title: 'Warning',
            icon: 'warning',
            text: info.message,
          }).then(hideNotification);
          break;
        }
      }
    }
  }, [isShowNotification]);
  return <></>;
};
export default React.memo(AppNotification);
