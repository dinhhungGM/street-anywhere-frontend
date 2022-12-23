import { Box, Slider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppMapBox } from '../../solutions/components/app-mapbox';
import * as exploreAsyncActions from './exploreAsyncActions';
import * as exploreSelectors from './exploreSelectors';
import styles from './styles.module.scss';

const Explore = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [radius, setRadius] = useState(50);
  const aroundHereData = useAppSelector(exploreSelectors.selectAroundHereData);
  const [currentCoord, setCurrentCoord] = useState<{ long: number; lat: number; } | null>(null);

  const handleSliderChange = (e, newValue): void => {
    setRadius(newValue);
  };

  const goToPostDetail = (postId: number): void => {
    navigate(`/posts/${ postId }`);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentCoord({ long: position.coords.longitude, lat: position.coords.latitude });
    });
  }, []);

  useEffect(() => {
    if (currentCoord && radius) {
      dispatch(
        exploreAsyncActions.findAroundHereData({
          long: +currentCoord.long,
          lat: +currentCoord.lat,
          radius,
        }),
      );
    }
  }, [currentCoord]);

  return (
    <Box className={styles.explore}>
      <Box className={styles.explore__slider}>
        <Typography fontWeight={700} marginRight={2}>
          Radius (km):
        </Typography>
        <Slider
          value={radius}
          min={10}
          step={0.1}
          max={100}
          valueLabelDisplay='on'
          aria-label='Radius'
          onChange={handleSliderChange}
          sx={{ width: '50%' }}
        />
      </Box>
      <Box className={styles.explore__map}>
        <AppMapBox />
      </Box>
    </Box>
  );
};

export default Explore;
