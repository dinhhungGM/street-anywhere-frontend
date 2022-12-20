import { Masonry } from '@mui/lab';
import { Box, Divider, Stack } from '@mui/material';
import { memo, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { profileActions, profileSelectors } from '..';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppCardV2 } from '../../../solutions/components/app-card-v2';
import { AppHeading } from '../../../solutions/components/app-heading';
import { authSelectors } from '../../auth/store';
import styles from './styles.module.scss';

const ProfileListPosts = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const myPosts = useAppSelector(profileSelectors.selectMyPosts);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);

  const isCreator = useMemo(() => {
    return currentUser?.id === +userId;
  }, [currentUser]);

  const getHeading = (): string => {
    const mediaType = searchParams.get('mediatype');
    return mediaType === 'image' ? `Images (${ myPosts?.length })` : `Videos (${ myPosts?.length })`;
  };

  useEffect(() => {
    const mediaType = searchParams.get('mediatype');
    dispatch(profileActions.getPostsOfUser({ userId: +userId, mediaType }));
    return () => {
      dispatch(profileActions.resetMyPosts());
    };
  }, [searchParams]);
  return (
    <>
      <Box className={styles.images}>
        {myPosts?.length ? (
          <>
            <AppHeading heading={getHeading()} />
            <br />
            <Masonry
              columns={{ xs: 1, sm: 3, md: 4, lg: 5, xl: 6 }}
              spacing={2}
              sx={{
                width: '100%',
              }}>
              {myPosts.map((post) => (
                <Box
                  sx={{
                    margin: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  key={post?.id}>
                  <AppCardV2 post={post} currentUserId={post?.userId} isCreator={isCreator} />
                </Box>
              ))}
            </Masonry>
          </>
        ) : (
          <Stack height='100%' alignItems='center' justifyContent='center'>
            <img src='/empty-data.jpg' alt='No data' />
          </Stack>
        )}
      </Box>
    </>
  );
};

export default memo(ProfileListPosts);
