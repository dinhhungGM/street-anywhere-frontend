import { Bookmark, ContentPaste, PermContactCalendar } from '@mui/icons-material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { AppIcon } from '../../solutions/components/app-icon';
import { authSelectors } from '../auth/store';
import { Bookmarks } from './components/bookmarks';
import { MyPost } from './components/my-post';
import { UserInformationForm } from './components/user-information-form';
import styles from './styles.module.scss';

const Profile = () => {
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState('1');
  const handleTabChange = (event: React.SyntheticEvent, newValue: string): void => {
    setCurrentTab(newValue);
  };

  //#region Check existing current user
  useEffect(() => {
    if (!currentUser) {
      navigate('/sign-in');
    }
  }, []);
  //#endregion
  return (
    <>
      <Box className={styles.profile}>
        <Box className={styles.profile__tabs}>
          <TabContext value={currentTab}>
            <Grid container>
              <Grid item md={3}>
                <TabList onChange={handleTabChange} aria-label='lab API tabs example' orientation='vertical'>
                  <Tab icon={<AppIcon component={PermContactCalendar} />} label='Profile' value='1' />
                  <Tab icon={<AppIcon component={ContentPaste} />} label='My Post' value='2' />
                  <Tab icon={<AppIcon component={Bookmark} />} label='Bookmark' value='3' />
                </TabList>
              </Grid>
              <Grid item md={9}>
                <Box className={styles.profile__tabs__content}>
                  <TabPanel value='1'>
                    <UserInformationForm currentUser={currentUser} />
                  </TabPanel>
                  <TabPanel value='2'>
                    <MyPost userId={currentUser.id} />
                  </TabPanel>
                  <TabPanel value='3'>
                    <Bookmarks />
                  </TabPanel>
                </Box>
              </Grid>
            </Grid>
          </TabContext>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
