import React, { useEffect } from 'react';
import SweetAlert from 'sweetalert2';
import { useAppSelector } from '../../../app/hooks';
import { wrapperSelectors } from '../../../features/wrapper/store';

const AppNotification = () => {
  const isShowNotification = useAppSelector(wrapperSelectors.selectIsShowNotification);
  const info = useAppSelector(wrapperSelectors.selectNotificationInfo);

  useEffect(() => {
    if (isShowNotification) {
      switch (info.typeOfNotification) {
        case 'success': {
          SweetAlert.fire({
            title: 'Success',
            icon: 'success',
            text: info.message,
          });
          break;
        }
        case 'error': {
          SweetAlert.fire({
            title: 'Error',
            icon: 'error',
            text: info.message,
          });
          break;
        }
      }
    }
  }, [isShowNotification]);
  return <></>;
};

export default React.memo(AppNotification);
