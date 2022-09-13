import { ReactNode } from 'react';
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
    </>
  );
};

export default Wrapper;
