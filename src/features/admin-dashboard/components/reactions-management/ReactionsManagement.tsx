import { AddReaction, PieChart } from '@mui/icons-material';
import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppDoughnutChart } from '../../../../solutions/components/app-doughnut-chart';
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
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  useEffect(() => {
    dispatch(adminActions.getAllReactionsForManagement(currentUser.id));
  }, []);
  return (
    <>
      <Box padding={4}>
        <Typography variant='h3' marginBottom={2}>
          Reactions
        </Typography>
        <Box>
          <Tabs value={tab} onChange={handleTabChange} aria-label='icon label tabs example' centered>
            <Tab
              icon={<AppIcon icon={AddReaction} />}
              label='Reactions'
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
              data={reactions}
              rowKey='id'
              searchByField='reactionType'
              searchPlaceholder='Search by type'
              isFilterByOption={false}
            />
          </AppTabPanel>
          <AppTabPanel value={tab} index={1}>
            <AppDoughnutChart data={reactions} labelField='reactionType' valueField='numberOfUses' />
          </AppTabPanel>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(ReactionsManagement);
