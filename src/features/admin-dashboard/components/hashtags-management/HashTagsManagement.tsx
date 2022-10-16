import { PieChart, Tag } from '@mui/icons-material';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { AppLineChart } from '../../../../solutions/components/app-line-chart';
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
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    dispatch(adminActions.getAllHashTagsForManagement(currentUser.id));
  }, []);

  return (
    <>
      <Box padding={4}>
        <Typography variant='h3' marginBottom={2}>
          Hash Tags
        </Typography>
        <Box>
          <Tabs value={tab} onChange={handleTabChange} aria-label='icon label tabs example' centered>
            <Tab icon={<AppIcon icon={Tag} />} label='Hashtags' iconPosition='start' className={styles['tab-item']} />
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
              data={hashTags}
              rowKey='id'
              searchByField='tagName'
              searchPlaceholder='Search by name'
              isFilterByOption={false}
            />
          </AppTabPanel>
          <AppTabPanel value={tab} index={1}>
            <AppLineChart
              data={hashTags}
              labelField='tagName'
              valueField='numberOfUses'
              chartTitle='Statistics of usage frequency'
            />
          </AppTabPanel>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(HashTagsManagement);
