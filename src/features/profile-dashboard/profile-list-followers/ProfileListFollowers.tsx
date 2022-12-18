import { memo, useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { profileSelectors, profileActions } from '../index';
import { AppTable } from '../../../solutions/components/app-table';
import { AppHeading } from '../../../solutions/components/app-heading';
import { Box, Typography } from '@mui/material';
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

interface IProfileListFollowersProps {
  currentUserId: number;
}
const ProfileListFollowers = ({ currentUserId }: IProfileListFollowersProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const followers = useAppSelector(profileSelectors.selectFollowers);

  const goToProfile = useCallback((userId: number) => {
    navigate(`/profile/${ userId }`);
  }, []);

  useEffect(() => {
    dispatch(profileActions.getFollowers(currentUserId));
  }, []);

  return (
    <>
      <Box className={styles.wrapper}>
        <Box paddingBottom={2}>
          <AppHeading heading={`Followers (${ followers.length })`} />
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
          <Typography textAlign='center'>No data</Typography>
        )}
      </Box>
    </>
  );
};

export default memo(ProfileListFollowers);
