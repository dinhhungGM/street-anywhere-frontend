import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';
import _ from 'lodash';
import { memo, useEffect, useState, useMemo } from 'react';
import SweetAlert from 'sweetalert2';
import AppTabPanel from '../app-tab-panel/AppTabPanel';
import { default as axios } from './../../services/axios';

interface AppListUserReactProps {
  postId: number;
}
const AppListUserReact = ({ postId }: AppListUserReactProps) => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const tabs = useMemo(() => {
    if (_.isNil(data)) {
      return [];
    }
    return ['all', ...Object.keys(data)];
  }, [data]);

  const allReactions = useMemo(() => {
    if (_.isNil(data)) {
      return [];
    }
    let results = [];
    for (const reaction in data) {
      results = [...results, ...data[reaction]];
    }
    return results;
  }, [data]);

  useEffect(() => {
    const getReactionDetails = async () => {
      try {
        const { data } = await axios.get(`/posts/reaction-details/${ postId }`);
        setData(data.value);
      } catch (error) {
        SweetAlert.fire({
          title: 'Error',
          icon: 'error',
          text: error.response.data.message,
        });
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
        {_.isNil(data) ? (
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
                  <Tab key={idx} label={`${ tab } (${ idx === 0 ? allReactions.length : data[tab]?.length })`} value={idx} />
                ))}
              </Tabs>
            </Stack>
            {tabs.map((tab, idx) => (
              <AppTabPanel key={idx} value={activeTab} index={idx}>
                <List>
                  {!activeTab
                    ? allReactions.map((user) => (
                      <ListItemButton key={user.userId}>
                        <Avatar />
                        <ListItemText sx={{ marginLeft: '12px' }}>{user.fullName}</ListItemText>
                      </ListItemButton>
                    ))
                    : data[tab]?.map((user) => (
                      <ListItemButton key={user.userId}>
                        <Avatar />
                        <ListItemText sx={{ marginLeft: '12px' }}>{user.fullName}</ListItemText>
                      </ListItemButton>
                    ))}
                </List>
              </AppTabPanel>
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default memo(AppListUserReact);
