import { Add, Close, Search } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, SyntheticEvent } from 'react';
import { AppIcon } from '../../../../solutions/components/app-icon';
import styles from './styles.module.scss';
import { useAppSelector, useAppDispatch } from '../../../../app/hooks';
import { adminActions, adminSelectors } from '../../store';
import { authSelectors } from '../../../auth/store';
import { useEffect, useState, useMemo } from 'react';
import { UserManagementTable } from './components/user-management-table';
import _ from 'lodash';
import { AppModal } from '../../../../solutions/components/app-modal';

const UserManagement = () => {
  const allUsers = useAppSelector(adminSelectors.selectAllUsers);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const dispatch = useAppDispatch();
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const handleOnFilterByNameChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement;
    setFilterName(target.value);
  };
  const handleOnFilterByRoleChange = (event: SelectChangeEvent) => {
    setFilterRole(event.target.value as string);
  };

  useEffect(() => {
    setFilterName('');
    setFilterRole('');
  }, [allUsers]);

  const displayUsers = useMemo(() => {
    return _.filter(allUsers, (user) => {
      if (!filterName && !filterRole) {
        return true;
      }
      let isValidSearch = !filterName ? true : _.lowerCase(user.fullName).includes(filterName.trim().toLowerCase());
      let isValidRole = !filterRole ? true : _.isEqual(user.role, filterRole);
      return isValidSearch && isValidRole;
    });
  }, [filterName, filterRole, allUsers]);

  useEffect(() => {
    dispatch(adminActions.getAllUsersForManagement(currentUser.id));
  }, []);

  return (
    <>
      <Box className={styles.wrapper}>
        <Typography variant='h4' fontWeight={700}>
          Users
        </Typography>
        <Stack direction='row' alignItems='center' justifyContent='flex-end'>
          <Button
            variant='contained'
            startIcon={<AppIcon icon={Add} color='#fff' />}
            onClick={() => setIsOpenCreateModal(true)}
          >
            New user
          </Button>
        </Stack>
        <Box component={Paper} className={styles.wrapper__table} elevation={3}>
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <OutlinedInput
                fullWidth
                placeholder='Search user by name...'
                startAdornment={
                  <InputAdornment position='start'>
                    <AppIcon icon={Search} />
                  </InputAdornment>
                }
                endAdornment={
                  <>
                    {filterName && (
                      <InputAdornment position='start'>
                        <IconButton color='error' onClick={() => setFilterName('')}>
                          <AppIcon icon={Close} />
                        </IconButton>
                      </InputAdornment>
                    )}
                  </>
                }
                value={filterName}
                onChange={handleOnFilterByNameChange}
              />
            </Grid>
            <Grid item sm={12} md={3}>
              <FormControl fullWidth>
                <InputLabel id='filterByRole'>Filter by role</InputLabel>
                <Select
                  labelId='filterByRole'
                  id='demo-simple-select'
                  label='Filter by role'
                  value={filterRole}
                  onChange={handleOnFilterByRoleChange}
                  endAdornment={
                    <>
                      {filterRole && (
                        <InputAdornment position='start' sx={{ marginRight: 2 }}>
                          <IconButton color='error' onClick={() => setFilterRole('')}>
                            <AppIcon icon={Close} />
                          </IconButton>
                        </InputAdornment>
                      )}
                    </>
                  }
                >
                  <MenuItem value='End user'>End user</MenuItem>
                  <MenuItem value='Administrator'>Administrator</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box className={styles.wrapper__table__content}>
            <UserManagementTable adminUserId={currentUser.id} allUsers={displayUsers} />
          </Box>
        </Box>
      </Box>
      <AppModal isOpen={isOpenCreateModal} onClose={() => setIsOpenCreateModal(false)}>
        <Box className={styles.modal} component={Paper}>
          <Box className={styles.modal__header}>
            <Typography variant='h4' fontWeight={600}>
              Create User
            </Typography>
          </Box>
        </Box>
      </AppModal>
    </>
  );
};

export default React.memo(UserManagement);
