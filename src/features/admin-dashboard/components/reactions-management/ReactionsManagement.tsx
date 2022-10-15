import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppLineChart } from '../../../../solutions/components/app-line-chart';
import { AppTable } from '../../../../solutions/components/app-table';
import { authSelectors } from '../../../auth/store';
import { adminActions, adminSelectors } from '../../store';

const headerConfigs = [
  {
    header: '#',
    isCenter: false,
  },
  {
    header: 'Type',
    isCenter: false,
  },
  {
    header: 'Icon',
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
    field: 'reactionType',
    isCenter: false,
  },
  {
    field: 'icon',
    isCenter: false,
  },
  {
    field: 'numberOfUses',
    isCenter: true,
  },
];

const ReactionsManagement = () => {
  const reactions = useAppSelector(adminSelectors.selectAllReactions);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminActions.getAllReactionsForManagement(currentUser.id));
  }, []);
  return (
    <>
      <Box padding={4}>
        <Typography variant='h3' marginBottom={2}>
          Reactions
        </Typography>
        <AppTable
          headerConfigs={headerConfigs}
          rowConfigs={rowConfigs}
          data={reactions}
          rowKey='id'
          searchByField='reactionType'
          searchPlaceholder='Search by type'
          isFilterByOption={false}
        />
        <AppLineChart data={reactions} labelField='reactionType' valueField='numberOfUses' />
      </Box>
    </>
  );
};

export default React.memo(ReactionsManagement);
