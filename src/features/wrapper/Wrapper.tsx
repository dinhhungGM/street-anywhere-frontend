import { ReactNode } from 'react';
import { AppMoveToTop } from '../../solutions/components/app-move-to-top';
import { AppNotification } from '../../solutions/components/app-notification';
import { LoadingSpinner } from '../../solutions/components/loading-spinner';
import { Header } from '../header';

type WrapperProps = {
  children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
  return (
    <>
      <Header />
      {children}
      <LoadingSpinner />
      <AppMoveToTop />
      <AppNotification />
    </>
  );
};

export default Wrapper;
