import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Tab,
  Tabs
} from '@mui/material';
import _ from 'lodash';
import { memo, useEffect, useMemo, useState } from 'react';
import SweetAlert from 'sweetalert2';
import { AppReactionProgress } from '../app-reaction-progress';
import AppTabPanel from '../app-tab-panel/AppTabPanel';
import { default as axios } from './../../services/axios';

interface AppListUserReactProps {
  postId: number;
}
const AppListUserReact = ({ postId }: AppListUserReactProps) => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = useMemo(() => {
    if (_.isNil(data)) {
      return [];
    }
    return ['all', ...Object.keys(data.reactionDetails)];
  }, [data]);

  const allReactions = useMemo(() => {
    if (_.isNil(data)) {
      return [];
    }
    let results = [];
    for (const reaction in data.reactionDetails) {
      results.push({
        label: reaction,
        progressValue: Math.round((data.reactionDetails[reaction].count / data.reactionCountAll) * 100),
      });
    }
    return results;
  }, [data]);

  useEffect(() => {
    const getReactionDetails = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/reactions/post/${ postId }`);
        setData(data.value);
      } catch (error) {
        SweetAlert.fire({
          title: 'Error',
          icon: 'error',
          text: error.response.data.message,
        });
      } finally {
        setIsLoading(false);
      }
    };
    getReactionDetails();
  }, []);

  return (
    <>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          maxHeight: '600px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}>
        {isLoading ? (
          <>
            <Stack alignItems='center' justifyContent='center' paddingY={4}>
              <CircularProgress color='primary' />
            </Stack>
          </>
        ) : (
          <>
            <Stack alignItems='center' justifyContent='center'>
              <Tabs value={activeTab} onChange={handleTabChange}>
                {tabs.map((tab, idx) => (
                  <Tab
                    key={idx}
                    label={`${ tab } (${ idx === 0 ? data.reactionCountAll : data.reactionDetails[tab]?.count })`}
                    value={idx}
                  />
                ))}
              </Tabs>
            </Stack>
            {tabs?.map((tab, idx) => (
              <AppTabPanel key={idx} value={activeTab} index={idx}>
                {idx === 0 ? (
                  <>
                    {allReactions?.map((reaction, idx) => (
                      <AppReactionProgress key={idx} label={reaction.label} progressValue={reaction.progressValue} />
                    ))}
                  </>
                ) : (
                  <List>
                    {data.reactionDetails[tab]?.users?.map((user) => (
                      <ListItemButton key={user.userId}>
                        <Avatar />
                        <ListItemText sx={{ marginLeft: '12px' }}>{user.fullName}</ListItemText>
                      </ListItemButton>
                    ))}
                  </List>
                )}
              </AppTabPanel>
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default memo(AppListUserReact);
