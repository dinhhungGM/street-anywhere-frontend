import { ReactNode } from 'react';
import { AppMoveToTop } from '../../solutions/components/app-move-to-top';
import { AppNotification } from '../../solutions/components/app-notification';
import { AppToast } from '../../solutions/components/app-toast';
import { LoadingSpinner } from '../../solutions/components/loading-spinner';
import { Footer } from '../footer';
import { Header } from '../header';

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <LoadingSpinner />
      <AppMoveToTop />
      <AppNotification />
      <AppToast />
    </>
  );
};

export default Wrapper;
