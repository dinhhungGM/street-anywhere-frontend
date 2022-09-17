import SweetAlert from 'sweetalert2';

const AlertUtil = {
  showSuccess: (message: string) => {
    SweetAlert.fire({
      title: 'Success',
      icon: 'success',
      text: message,
    });
  },
  showError: (error: any) => {
    const message = error.response.data?.message || error.message;
    SweetAlert.fire({
      title: 'Error',
      icon: 'error',
      text: message,
    });
  },
};

export default AlertUtil;
