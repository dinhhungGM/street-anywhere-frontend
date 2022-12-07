import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Button, Container, Grid, Paper, Stack } from '@mui/material';
import cx from 'classnames';
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppIcon } from '../../solutions/components/app-icon';
import { AppPostCard } from '../../solutions/components/app-post-card';
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
      <AppPostCard />
    </>
  );
};

export default React.memo(Shorts);
