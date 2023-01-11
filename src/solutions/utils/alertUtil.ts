import SweetAlert from 'sweetalert2';

const AlertUtil = {
  showSuccess: (message: string) => {
    return SweetAlert.fire({
      title: 'Success',
      icon: 'success',
      text: message,
    });
  },
  showError: (error: any) => {
    const message = error.toString();
    return SweetAlert.fire({
      title: 'Error',
      icon: 'error',
      text: message,
    });
  },
};

export default AlertUtil;
