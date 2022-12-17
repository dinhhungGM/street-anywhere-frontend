import { AccountBox, Edit, EmojiPeople, Info, Person } from '@mui/icons-material';
import { Box, IconButton, Paper, Tab, Tabs, Typography } from '@mui/material';
import _ from 'lodash';
import { memo, useState } from 'react';
import SweetAlert from 'sweetalert2';
import { useAppDispatch } from '../../../app/hooks';
import { AppHeading } from '../../../solutions/components/app-heading';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppInputWithEdit } from '../../../solutions/components/app-input-with-edit';
import AppTabPanel from '../../../solutions/components/app-tab-panel/AppTabPanel';
import { profileActions } from '../index';
import { IProfileDetail } from '../profileDashBoardModels';
import styles from './styles.module.scss';

interface IProfilePersonalInfoProps {
  isCurrentUser?: boolean;
  profileDetail?: IProfileDetail;
}
const ProfilePersonalInfo = ({ isCurrentUser, profileDetail }: IProfilePersonalInfoProps) => {
  const [tab, setTab] = useState(0);
  const dispatch = useAppDispatch();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const openUpdatingDataModal = async (
    title: string,
    placeholder: string,
    inputType: any,
    inputValue: any,
    field: string,
    handlerFn?: any,
  ) => {
    const { value } = await SweetAlert.fire({
      title,
      input: inputType,
      inputValue,
      inputPlaceholder: placeholder,
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Not empty';
        }
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      confirmButtonColor: '#0288d1',
    });
    if (!_.isNil(value)) {
      handlerFn({ [field]: value });
    }
  };

  const updateUser = async (data) => {
    dispatch(
      profileActions.updateUser({ userId: profileDetail?.id, payload: data, isFormData: false }),
    );
  };

  return (
    <>
      <Box className={styles.wrapper}>
        <Box className={styles.content} component={Paper} elevation={3}>
          <Box className={styles.wrapper__tabs}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              orientation='vertical'
              aria-label='Vertical tabs'
              allowScrollButtonsMobile
              variant='scrollable'
              scrollButtons='auto'>
              <Tab
                icon={<AppIcon icon={EmojiPeople} />}
                label='Introduction'
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
                  icon={<AppIcon icon={Person} />}
                  label='Personal'
                  iconPosition='start'
                  className={styles.wrapper__tabs__item}
                />
              )}
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
              <AppHeading heading='Welcome to my home <3' />
              <Box className={styles.description}>
                <Typography marginTop={1}>
                  {profileDetail?.description || '(No description)'}
                </Typography>
                {isCurrentUser && (
                  <IconButton
                    className={styles.edit}
                    color='error'
                    onClick={() =>
                      openUpdatingDataModal(
                        'Update description',
                        'Describe yourself',
                        'textarea',
                        profileDetail?.description,
                        'description',
                        updateUser,
                      )
                    }>
                    <AppIcon icon={Edit} />
                  </IconButton>
                )}
              </Box>
            </AppTabPanel>
            <AppTabPanel value={tab} index={1}>
              <AppHeading heading='More' />
              <AppInputWithEdit
                title='Bio'
                value={profileDetail?.bio}
                isReadonly={!isCurrentUser}
                onEdit={() =>
                  openUpdatingDataModal(
                    'Update bio',
                    'Update bio',
                    'text',
                    profileDetail?.bio,
                    'bio',
                    updateUser,
                  )
                }
              />
            </AppTabPanel>
            <AppTabPanel value={tab} index={2}>
              <AppHeading heading='Personal Information' />
              <AppInputWithEdit
                title='First name'
                isReadonly={!isCurrentUser}
                value={profileDetail?.firstName}
                onEdit={() =>
                  openUpdatingDataModal(
                    'Update first name',
                    'Enter your first name',
                    'text',
                    profileDetail?.firstName,
                    'firstName',
                    updateUser,
                  )
                }
              />
              <AppInputWithEdit
                title='Last name'
                value={profileDetail?.lastName}
                isReadonly={!isCurrentUser}
                onEdit={() =>
                  openUpdatingDataModal(
                    'Update last name',
                    'Enter your last name',
                    'text',
                    profileDetail?.lastName,
                    'lastName',
                    updateUser,
                  )
                }
              />
              <AppInputWithEdit
                title='Email'
                value={profileDetail?.email}
                isReadonly={!isCurrentUser}
                onEdit={() =>
                  openUpdatingDataModal(
                    'Update email',
                    'Enter your email',
                    'email',
                    profileDetail?.email,
                    'email',
                    updateUser,
                  )
                }
              />
              <AppInputWithEdit
                title='Phone'
                value={profileDetail?.phone}
                isReadonly={!isCurrentUser}
                onEdit={() =>
                  openUpdatingDataModal(
                    'Update phone',
                    'Enter your phone',
                    'text',
                    profileDetail?.phone,
                    'phone',
                    updateUser,
                  )
                }
              />
            </AppTabPanel>
            <AppTabPanel value={tab} index={3}>
              <AppHeading heading='Account Information' />
              <AppInputWithEdit title='Username' value={profileDetail?.username} isReadonly />
              <AppInputWithEdit
                title='Password'
                value='****************'
                inputType='password'
                onEdit={() =>
                  openUpdatingDataModal(
                    'Update password',
                    'New password',
                    'password',
                    '',
                    'password',
                    updateUser,
                  )
                }
              />
            </AppTabPanel>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default memo(ProfilePersonalInfo);
