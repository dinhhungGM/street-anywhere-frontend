import { ReactNode } from 'react';
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
    </>
  );
};

export default Wrapper;
