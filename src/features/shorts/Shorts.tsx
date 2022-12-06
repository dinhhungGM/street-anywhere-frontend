import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { Box, Button, Container, Grid, Paper, Stack } from '@mui/material';
import cx from 'classnames';
import React, { useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppIcon } from '../../solutions/components/app-icon';
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
      <Box className={styles['shorts']}>
        <Container className={styles['shorts-container']}>
          <Box component={Paper} elevation={3} height='100%' padding={0}>
            <Grid container spacing={1} height='100%' padding={0}>
              <Grid item md={7} className={styles['shorts-col']}>
                <Box className={styles['shorts-video']}>
                  <ReactPlayer
                    playing
                    controls
                    width='100%'
                    height='80%'
                    url='https://www.youtube.com/watch?v=i4z7PIlvJkg&t=527s'
                  />
                </Box>
              </Grid>
              <Grid item md={4} className={styles['shorts-col']}></Grid>
              <Grid item md={1} className={styles['shorts-col']}>
                <Stack
                  borderLeft='1px solid #ccc'
                  spacing={2}
                  height='100%'
                  alignItems='center'
                  justifyContent='center'>
                  <Button color='warning' variant='contained' className={styles['btn']}>
                    <AppIcon icon={KeyboardArrowUp} fontSize={60} color='#fff' />
                  </Button>
                  <Button color='success' variant='contained' className={styles['btn']}>
                    <AppIcon icon={KeyboardArrowDown} fontSize={60} color='#fff' />
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default React.memo(Shorts);
