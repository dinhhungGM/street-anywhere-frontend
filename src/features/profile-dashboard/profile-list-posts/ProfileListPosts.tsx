import { Masonry } from '@mui/lab';
import { Box } from '@mui/material';
import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileActions, profileSelectors } from '..';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppCardV2 } from '../../../solutions/components/app-card-v2';
import styles from './styles.module.scss';

interface IProfileListPostsProps {
  currentUserId: number;
  mediaType: 'image' | 'video';
  isCreator?: boolean;
}
const ProfileListPosts = ({ currentUserId, mediaType, isCreator }: IProfileListPostsProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const myPosts = useAppSelector(profileSelectors.selectMyPosts);
  console.log(myPosts);
  useEffect(() => {
    dispatch(profileActions.getPostsOfUser({ userId: currentUserId, mediaType }));
    return () => {
      dispatch(profileActions.resetMyPosts());
    };
  }, []);
  return (
    <>
      <Box className={styles.images}>
        {myPosts?.length ? (
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
        ) : (
          <Box></Box>
        )}
      </Box>
    </>
  );
};

export default memo(ProfileListPosts);
