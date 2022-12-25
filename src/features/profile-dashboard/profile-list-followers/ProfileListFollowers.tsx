import { Box, Stack } from '@mui/material';
import { memo, useCallback, useEffect } from 'react';
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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId: currentUserId } = useParams();
  const followers = useAppSelector(profileSelectors.selectFollowers);

  const goToProfile = useCallback((userId: number) => {
    navigate(`/profile/${ userId }`, { replace: true });
  }, []);

  useEffect(() => {
    dispatch(profileActions.getFollowers(+currentUserId));
    return () => {
      dispatch(profileActions.resetFollowers());
    };
  }, []);

  return (
    <>
      <Box className={styles.wrapper}>
        <Box paddingBottom={2}>
          <AppHeading heading={`Followers (${ followers?.length })`} />
        </Box>
        {followers?.length ? (
          <AppTable
            data={followers}
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
