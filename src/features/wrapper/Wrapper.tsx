import { ReactNode } from 'react';
import { AppMoveToTop } from '../../solutions/components/app-move-to-top';
import { AppNotification } from '../../solutions/components/app-notification';
import { AppToast } from '../../solutions/components/app-toast';
import { LoadingSpinner } from '../../solutions/components/loading-spinner';
import { Footer } from '../footer';
import { Header } from '../header';
import { Box } from '@mui/material';

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <>
      <Box
        sx={{
          minHeight: 'calc(100vh - 56px - 74px)',
        }}>
        <Header />
        {children}
        <Footer />
        <LoadingSpinner />
        <AppMoveToTop />
        <AppNotification />
        <AppToast />
      </Box>
    </>
  );
};

export default Wrapper;
