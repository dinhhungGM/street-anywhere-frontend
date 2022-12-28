import { Box, Divider } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppHeading } from '../../../../solutions/components/app-heading';
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
    header: 'Number of users',
    isCenter: false,
  },
];

const rowConfigs = [
  {
    field: 'id',
    isCenter: false,
  },
  {
    field: 'roleName',
    isCenter: false,
  },
  {
    field: 'numberOfUsers',
    isCenter: true,
  },
];

const RoleManagement = () => {
  const roles = useAppSelector(adminSelectors.selectAllRoles);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminActions.getAllRolesForManagement(currentUser.id));
  }, []);
  return (
    <>
      <Box padding={4}>
        <AppHeading heading='Roles' isDashboardHeading />
        <br />
        <Divider />
        <Box marginY={2}>
          <AppTable
            headerConfigs={headerConfigs}
            rowConfigs={rowConfigs}
            data={roles}
            rowKey='id'
            searchByField='roleName'
            searchPlaceholder='Search by name'
            isFilterByOption={false}
          />
        </Box>
      </Box>
    </>
  );
};

export default React.memo(RoleManagement);
