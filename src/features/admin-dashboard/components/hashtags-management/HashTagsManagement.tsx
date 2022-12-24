import { Add, PieChart, Tag } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl, Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { AppLineChart } from '../../../../solutions/components/app-line-chart';
import { AppModal } from '../../../../solutions/components/app-modal';
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
  const [isShowModal, setIsShowModal] = React.useState(false);
  const form = useFormik({
    initialValues: {
      tagName: '',
    },
    onSubmit: async (values, { resetForm }) => {
      const res = await dispatch(
        adminActions.createNewHashTag({
          adminUserId: currentUser.id,
          payload: values,
        }),
      );
      if (res.meta.requestStatus === 'fulfilled') {
        handleCloseModal();
      }
    },
    validationSchema: yup.object({
      tagName: yup
        .string()
        .required('Please provide the tag name to continue')
        .trim()
        .max(50, 'The tag can not be more than 50 characters'),
    }),
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleCloseModal = (): void => {
    form.resetForm();
    setIsShowModal(false);
  };

  const checkControl = (controlName: string) => {
    if (form.touched[controlName] && form.errors[controlName]) {
      return {
        helperText: form.errors[controlName],
      };
    }
    return null;
  };

  const deleteTag = (tagId): void => {
    dispatch(adminActions.deleteTag({
      adminUserId: currentUser.id,
      tagId
    }));
  };

  useEffect(() => {
    dispatch(adminActions.getAllHashTagsForManagement(currentUser.id));
  }, []);

  return (
    <>
      <Box padding={4}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Typography variant='h3' marginBottom={2}>
            Hash Tags
          </Typography>
          <Button
            startIcon={<AppIcon icon={Add} color='#fff' />}
            color='primary'
            variant='contained'
            sx={{
              marginRight: 2,
            }}
            onClick={() => setIsShowModal(true)}
          >
            New hashtag
          </Button>
        </Stack>
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
              isDisplayMoreMenu={true}
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
      <AppModal
        isOpen={isShowModal}
        title='New hashtag'
        onClose={handleCloseModal}
        onCancel={handleCloseModal}
        onOk={() => form.handleSubmit()}
        okText='Create'
      >
        <FormControl fullWidth>
          <TextField
            placeholder='Enter tag name'
            id='tagName'
            name='tagName'
            label='Tag name'
            {...form.getFieldProps('tagName')}
            error={!!checkControl('tagName')}
            {...checkControl('tagName')}
          />
        </FormControl>
      </AppModal>
    </>
  );
};

export default React.memo(HashTagsManagement);
