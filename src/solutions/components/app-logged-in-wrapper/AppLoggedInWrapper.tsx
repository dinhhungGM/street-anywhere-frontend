import _ from 'lodash';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppSelector } from '../../../app/hooks';
import { authSelectors } from '../../../features/auth/store';

const AppLoggedInWrapper = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);

  useEffect(() => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Warning',
        icon: 'warning',
        text: 'Please logged to continue',
      }).then((status) => {
        if (!status.isConfirmed || status.isDismissed) {
          navigate(-1);
        } else if (status.isConfirmed) {
          navigate('/sign-in');
        }
      });
    }
  }, []);
  return <>{children}</>;
};

export default AppLoggedInWrapper;
