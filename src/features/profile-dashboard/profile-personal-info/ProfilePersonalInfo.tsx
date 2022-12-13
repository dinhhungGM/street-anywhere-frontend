import { AccountBox, Edit, EmojiPeople, Info, Person } from '@mui/icons-material';
import { Box, IconButton, Paper, Tab, Tabs, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { AppHeading } from '../../../solutions/components/app-heading';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppInputWithEdit } from '../../../solutions/components/app-input-with-edit';
import AppTabPanel from '../../../solutions/components/app-tab-panel/AppTabPanel';
import { IProfileDetail } from '../profileDashBoardModels';
import styles from './styles.module.scss';

interface IProfilePersonalInfoProps {
  isCurrentUser?: boolean;
  profileDetail?: IProfileDetail;
}
const ProfilePersonalInfo = ({ isCurrentUser, profileDetail }: IProfilePersonalInfoProps) => {
  const [tab, setTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <>
      <Box className={styles.wrapper}>
        <Box className={styles.content} component={Paper} elevation={3}>
          <Box className={styles.wrapper__tabs}>
            <Tabs value={tab} onChange={handleTabChange} orientation='vertical' aria-label='Vertical tabs'>
              <Tab
                icon={<AppIcon icon={EmojiPeople} />}
                label='Introduction'
                iconPosition='start'
                className={styles.wrapper__tabs__item}
              />
              <Tab
                icon={<AppIcon icon={Person} />}
                label='Personal'
                iconPosition='start'
                className={styles.wrapper__tabs__item}
              />
              <Tab
                icon={<AppIcon icon={Info} />}
                label='More'
                iconPosition='start'
                className={styles.wrapper__tabs__item}
              />
              {isCurrentUser && (
                <Tab
                  icon={<AppIcon icon={AccountBox} />}
                  label='Account'
                  iconPosition='start'
                  className={styles.wrapper__tabs__item}
                />
              )}
            </Tabs>
          </Box>
          <Box className={styles.wrapper__tab}>
            <AppTabPanel value={tab} index={0}>
              <Box className={styles.description}>
                <Typography>{profileDetail?.description || '(No description)'}</Typography>
                <IconButton className={styles.edit} color='error'>
                  <AppIcon icon={Edit} />
                </IconButton>
              </Box>
            </AppTabPanel>
            <AppTabPanel value={tab} index={1}>
              <AppHeading heading='Personal Information' />
              <AppInputWithEdit title='First name' value={profileDetail?.firstName} />
              <AppInputWithEdit title='Last name' value={profileDetail?.lastName} />
              <AppInputWithEdit title='Email' value={profileDetail?.email} />
              <AppInputWithEdit title='Phone' value={profileDetail?.phone} />
            </AppTabPanel>
            <AppTabPanel value={tab} index={2}>
              <AppHeading heading='More' />
              <AppInputWithEdit title='Bio' value={profileDetail?.bio} />
            </AppTabPanel>
            <AppTabPanel value={tab} index={3}>
              <AppHeading heading='Account Information' />
              <AppInputWithEdit title='Username' value={profileDetail?.username} isReadonly />
              <AppInputWithEdit title='Password' value='****************' inputType='password' />
            </AppTabPanel>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(ProfilePersonalInfo);
