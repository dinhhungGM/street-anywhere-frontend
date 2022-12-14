import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as shortAsyncActions from './store/shortsAsyncActions';
import * as shortsSelectors from './store/shortsSelectors';
import styles from './styles.module.scss';

const Shorts = () => {
  const dispatch = useAppDispatch();
  const shorts = useAppSelector(shortsSelectors.selectShorts);

  useEffect(() => {
    dispatch(shortAsyncActions.getShorts());
  }, []);

  return (
    <>
      <Box className={styles.shorts}></Box>
    </>
  );
};

export default React.memo(Shorts);
