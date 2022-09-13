import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../../app/hooks';
import { selectIsLoading } from '../../../features/wrapper/store/wrapperSelectors';

const LoadingSpinner = () => {
  const isShowLoading = useAppSelector(selectIsLoading);
  return (
    <>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isShowLoading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

export default LoadingSpinner;
