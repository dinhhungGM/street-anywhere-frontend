import SweetAlert from 'sweetalert2';

const AlertUtil = {
  showSuccess: (message: string) => {
    SweetAlert.fire({
      title: 'Success',
      icon: 'success',
      text: message,
    });
  },
  showError: (message: string) => {
    SweetAlert.fire({
      title: 'Error',
      icon: 'error',
      text: message,
    });
  },
};

export default AlertUtil;