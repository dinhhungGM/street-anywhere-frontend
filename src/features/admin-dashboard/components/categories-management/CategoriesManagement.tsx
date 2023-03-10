import { Add, Category, PieChart } from '@mui/icons-material';
import { Box, Button, Divider, Stack, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppBarChart } from '../../../../solutions/components/app-bar-chart';
import { AppHeading } from '../../../../solutions/components/app-heading';
import { AppIcon } from '../../../../solutions/components/app-icon';
import AppTabPanel from '../../../../solutions/components/app-tab-panel/AppTabPanel';
import { AppTable } from '../../../../solutions/components/app-table';
import { authSelectors } from '../../../auth/store';
import { adminActions, adminSelectors } from '../../store';
import styles from './styles.module.scss';

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
    isCenter: false,
  },
];

const rowConfigs = [
  {
    field: 'id',
    isCenter: false,
  },
  {
    field: 'categoryName',
    isCenter: false,
  },
  {
    field: 'numberOfUses',
    isCenter: true,
  },
];

const CategoriesManagement = () => {
  const categories = useAppSelector(adminSelectors.selectAllCategories);
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const dispatch = useAppDispatch();
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    dispatch(adminActions.getAllCategoriesForManagement(currentUser.id));
  }, []);

  // Handle create new category
  const handleCreateNewCategory = async () => {
    const { value } = await Swal.fire({
      title: 'New category',
      input: 'text',
      inputLabel: 'Enter category name',
      inputValue: '',
      showCancelButton: true,
      confirmButtonText: 'Create',
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Empty field!';
        }
        if (value.length > 50) {
          return 'The category name can not be more than 50 characters';
        }
      },
    });
    if (value) {
      dispatch(
        adminActions.createNewCategory({ adminUserId: currentUser?.id, categoryName: value }),
      );
    }
  };

  return (
    <>
      <Box padding={4}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <AppHeading heading='Categories' isDashboardHeading />
          <Button
            variant='contained'
            startIcon={<AppIcon icon={Add} color='#fff' />}
            onClick={handleCreateNewCategory}>
            New category
          </Button>
        </Stack>
        <br />
        <Divider />
        <Box>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label='icon label tabs example'
            centered>
            <Tab
              icon={<AppIcon icon={Category} />}
              label='Categories'
              iconPosition='start'
              className={styles['tab-item']}
            />
            <Tab
              icon={<AppIcon icon={PieChart} />}
              label='Statistical Chart'
              iconPosition='start'
              className={styles['tab-item']}
            />
          </Tabs>
          <AppTabPanel value={tab} index={0}>
            <AppTable
              headerConfigs={headerConfigs}
              rowConfigs={rowConfigs}
              data={categories}
              rowKey='id'
              searchByField='categoryName'
              searchPlaceholder='Search by name'
              isFilterByOption={false}
            />
          </AppTabPanel>
          <AppTabPanel value={tab} index={1}>
            <AppBarChart
              data={categories}
              labelField='categoryName'
              valueField='numberOfUses'
              chartTitle='Statistics of usage frequency'
            />
          </AppTabPanel>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(CategoriesManagement);
