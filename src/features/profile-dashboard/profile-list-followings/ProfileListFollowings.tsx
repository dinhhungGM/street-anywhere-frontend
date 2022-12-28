import { Box, Stack } from '@mui/material';
import { memo, useCallback, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AppHeading } from '../../../solutions/components/app-heading';
import { AppTable } from '../../../solutions/components/app-table';
import { profileActions, profileSelectors } from '../index';
import styles from './styles.module.scss';

const headerConfigs = [
  {
    header: '#',
    isCenter: false,
  },
  {
    header: 'User',
    isCenter: false,
    customClass: 'w-50px',
  },
  {
    header: 'Name',
    isCenter: false,
  },
];

const rowConfigs = [
  {
    field: 'userId',
    isCenter: false,
  },
  {
    field: 'profilePhotoUrl',
    isCenter: false,
    isAvatar: true,
  },
  {
    field: 'fullName',
    isCenter: false,
  },
];

const ProfileListFollowers = () => {
  const contentRef = useRef();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId: currentUserId } = useParams();
  const followings = useAppSelector(profileSelectors.selectFollowings);

  const goToProfile = useCallback((userId: number) => {
    navigate(`/profile/${ userId }`, { replace: true });
  }, []);

  useEffect(() => {
    dispatch(profileActions.getFollowings(+currentUserId));
    const timer = setTimeout(() => {
      (contentRef.current as any).scrollIntoView();
    });
    return () => {
      dispatch(profileActions.resetFollowings());
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <Box className={styles.wrapper}>
        <Box paddingBottom={2} ref={contentRef}>
          <AppHeading heading={`Followings (${ followings?.length })`} />
        </Box>
        {followings?.length ? (
          <AppTable
            data={followings}
            headerConfigs={headerConfigs}
            rowConfigs={rowConfigs}
            isFilterByOption={false}
            onRowClick={goToProfile}
            mappingClickField='userId'
          />
        ) : (
          <Stack alignItems='center' justifyContent='center'>
            <img src='/empty-data.jpg' alt='Empty data' />
          </Stack>
        )}
      </Box>
    </>
  );
};

export default memo(ProfileListFollowers);
