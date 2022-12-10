import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { wrapperActions, wrapperSelectors } from '../../../features/wrapper/store';

const configTitle = {
  info: 'Info',
  error: 'Error',
  warning: 'Warning',
  success: 'Success',
};
const AppToast = () => {
  const toastConfig = useAppSelector(wrapperSelectors.selectToastConfig);
  const dispatch = useAppDispatch();

  const hideToast = (): void => {
    dispatch(wrapperActions.hideToast());
  };
  return (
    <>
      {toastConfig && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={toastConfig.isShowToast}
          autoHideDuration={3000}
          onClose={hideToast}>
          <Alert severity={toastConfig.toastSeverity} onClose={hideToast} variant='filled' sx={{ maxWidth: '500%' }}>
            <AlertTitle>{configTitle[toastConfig.toastSeverity]}</AlertTitle>
            {toastConfig.toastMessage}
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

export default memo(AppToast);
