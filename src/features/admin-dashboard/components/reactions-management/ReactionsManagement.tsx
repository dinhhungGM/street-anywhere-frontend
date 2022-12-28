import { AddReaction, PieChart } from '@mui/icons-material';
import { Box, Divider, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppDoughnutChart } from '../../../../solutions/components/app-doughnut-chart';
import { AppHeading } from '../../../../solutions/components/app-heading';
import { AppIcon } from '../../../../solutions/components/app-icon';
import AppTabPanel from '../../../../solutions/components/app-tab-panel/AppTabPanel';
import { AppTable } from '../../../../solutions/components/app-table';
import { authSelectors } from '../../../auth/store';
import { adminActions, adminSelectors } from '../../store';
import styles from './styles.module.scss';

import { useMemo } from 'react';
import AngryIconSrc from './../../../../solutions/assets/images/reactions/angry.png';
import CareIconSrc from './../../../../solutions/assets/images/reactions/care.png';
import HahaIconSrc from './../../../../solutions/assets/images/reactions/haha.png';
import LikeIconSrc from './../../../../solutions/assets/images/reactions/like.png';
import LoveIconSrc from './../../../../solutions/assets/images/reactions/love.png';
import SadIconSrc from './../../../../solutions/assets/images/reactions/sad.png';
import WowIconSrc from './../../../../solutions/assets/images/reactions/wow.png';

const mappingIconSrc = {
  Like: LikeIconSrc,
  HaHa: HahaIconSrc,
  Love: LoveIconSrc,
  Sad: SadIconSrc,
  Care: CareIconSrc,
  Wow: WowIconSrc,
  Angry: AngryIconSrc,
};

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
    isCenter: false,
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
    isAvatar: true,
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

  const displayReactions = useMemo(() => {
    return reactions.map((item) => ({ ...item, icon: mappingIconSrc[item.reactionType] }));
  }, [currentUser]);

  return (
    <>
      <Box padding={4}>
        <AppHeading heading='Reactions' isDashboardHeading />
        <br />
        <Divider />
        <Box>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            aria-label='icon label tabs example'
            centered>
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
              data={displayReactions}
              rowKey='id'
              searchByField='reactionType'
              searchPlaceholder='Search by type'
              isFilterByOption={false}
            />
          </AppTabPanel>
          <AppTabPanel value={tab} index={1}>
            <AppDoughnutChart
              data={reactions}
              labelField='reactionType'
              valueField='numberOfUses'
            />
          </AppTabPanel>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(ReactionsManagement);
