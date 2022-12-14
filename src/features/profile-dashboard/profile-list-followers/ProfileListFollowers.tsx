import { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { profileSelectors, profileActions } from '../index';
import { AppTable } from '../../../solutions/components/app-table';
import { AppHeading } from '../../../solutions/components/app-heading';
import { Box, Typography } from '@mui/material';
import styles from './styles.module.scss';

const headerConfigs = [
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
    field: 'profilePhotoUrl',
    isCenter: true,
    isAvatar: true,
    customClass: 'w-50px',
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
  const naviate = useNavigate();
  const followers = useAppSelector(profileSelectors.selectFollowers);

  useEffect(() => {
    dispatch(profileActions.getFollowers(currentUserId));
  }, []);

  return (
    <>
      <Box className={styles.wrapper}>
        <Box paddingBottom={2}>
          <AppHeading heading={`Followers(${ followers.length })`} />
        </Box>
        {followers?.length ? (
          <AppTable
            data={followers}
            headerConfigs={headerConfigs}
            rowConfigs={rowConfigs}
            isFilterByOption={false}
          />
        ) : (
          <Typography textAlign='center'>No data</Typography>
        )}
      </Box>
    </>
  );
};

export default memo(ProfileListFollowers);
