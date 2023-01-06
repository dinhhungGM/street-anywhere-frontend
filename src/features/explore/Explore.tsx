import { Masonry } from '@mui/lab';
import { Box, Slider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import useDebounce from '../../hooks/useDebounce';
import { AppExploreCard } from '../../solutions/components/app-explore-card';
import { authSelectors } from '../auth/store';
import { wrapperSelectors } from '../wrapper/store';
import * as exploreAsyncActions from './exploreAsyncActions';
import * as exploreSelectors from './exploreSelectors';
import styles from './styles.module.scss';

const Explore = () => {
  const dispatch = useAppDispatch();
  const [radius, setRadius] = useState(50);
  const searchingRadius = useDebounce<number>(radius, 500);
  const isLoading = useAppSelector(wrapperSelectors.selectIsLoading);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const aroundHereData = useAppSelector(exploreSelectors.selectAroundHereData);
  const [currentCoord, setCurrentCoord] = useState<{ long: number; lat: number } | null>(null);

  const handleSliderChange = (e, newValue): void => {
    setRadius(newValue);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCurrentCoord({ long: position.coords.longitude, lat: position.coords.latitude });
    });
  }, []);

  useEffect(() => {
    if (currentCoord && searchingRadius) {
      dispatch(
        exploreAsyncActions.findAroundHereData({
          long: +currentCoord.long,
          lat: +currentCoord.lat,
          radius: searchingRadius,
        }),
      );
    }
  }, [currentCoord, searchingRadius]);

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
        {isLoading ? null : currentCoord ? (
          aroundHereData?.length ? (
            <>
              <Box padding={2}>
                <Masonry
                  columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
                  spacing={2}
                  sx={{
                    width: '100%',
                  }}>
                  {aroundHereData.map((post) => (
                    <AppExploreCard
                      key={post?.id}
                      type={post?.type}
                      postId={post?.id}
                      title={post?.title}
                      userId={post?.userId}
                      postLat={post?.latitude}
                      address={post?.location}
                      distance={post?.distance}
                      fullName={post?.fullName}
                      imageUrl={post?.imageUrl}
                      postLong={post?.longitude}
                      createdAt={post?.createdAt}
                      userLat={currentCoord?.lat}
                      userLong={currentCoord?.long}
                      videoYtbUrl={post?.videoYtbUrl}
                      currentUserId={currentUser?.id}
                      isBookmarked={post?.isBookmarked}
                      bookmarkDetail={post?.bookmarkedDetail}
                      followingDetail={post?.followingDetail}
                      isFollowingUser={post?.isFollowingUser}
                      profilePhotoUrl={post?.profilePhotoUrl}
                    />
                  ))}
                </Masonry>
              </Box>
            </>
          ) : (
            <Stack alignItems='center' justifyContent='center'>
              <img src='/empty-data.jpg' alt='Empty around here data' />
            </Stack>
          )
        ) : (
          <Stack alignItems='center' justifyContent='center'>
            <img src='/gg-map-error.jpg' alt='Google map error' />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default Explore;
