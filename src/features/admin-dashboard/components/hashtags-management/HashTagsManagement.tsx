import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppTable } from '../../../../solutions/components/app-table';
import { authSelectors } from '../../../auth/store';
import { adminActions, adminSelectors } from '../../store';

const headerConfigs = [
  {
    header: '#',
    isCenter: false,
  },
  {
    header: 'Name',
    isCenter: false,
  },
  {
    header: 'Number of uses',
    isCenter: true,
  },
];

const rowConfigs = [
  {
    field: 'id',
    isCenter: false,
  },
  {
    field: 'tagName',
    isCenter: false,
  },
  {
    field: 'numberOfUses',
    isCenter: true,
  },
];

const HashTagsManagement = () => {
  const hashTags = useAppSelector(adminSelectors.selectAllHashTags);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminActions.getAllHashTagsForManagement(currentUser.id));
  }, []);

  return (
    <>
      <Box padding={4}>
        <Typography variant='h3' marginBottom={2}>
          Hash Tags
        </Typography>
        <AppTable
          headerConfigs={headerConfigs}
          rowConfigs={rowConfigs}
          data={hashTags}
          rowKey='id'
          searchByField='categoryName'
          searchPlaceholder='Search by name'
          isFilterByOption={false}
        />
      </Box>
    </>
  );
};

export default React.memo(HashTagsManagement);
