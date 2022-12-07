import { Alert, AlertTitle, Snackbar } from '@mui/material';
import { memo } from 'react';

const configTitle = {
  info: 'Info',
  error: 'Error',
  warning: 'Warning',
  success: 'Success',
};
interface IAppToastProps {
  isOpen: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info' | 'success';
  onClose: (e) => any;
}
const AppToast = ({ isOpen, severity, message, onClose }: IAppToastProps) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isOpen}
        autoHideDuration={3000}
        onClose={onClose}>
        <Alert severity={severity} onClose={onClose} sx={{ width: '100%' }}>
          <AlertTitle>{configTitle[severity]}</AlertTitle>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default memo(AppToast);
