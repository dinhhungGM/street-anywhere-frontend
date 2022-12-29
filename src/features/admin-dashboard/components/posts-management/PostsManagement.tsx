import { Close, Search } from '@mui/icons-material';
import { Box, Button, Divider, Pagination, Stack, TextField, InputAdornment } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppHeading } from '../../../../solutions/components/app-heading';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { AppIconButton } from '../../../../solutions/components/app-icon-button';
import { AppTable } from '../../../../solutions/components/app-table';
import { landingPageActions, landingPageSelectors } from '../../../landing-page/store';
import { adminActions, adminSelectors } from '../../store';
import { headerConfigs, rowConfigs } from './configs';
import styles from './styles.module.scss';

const PostsManagement = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const posts = useAppSelector(adminSelectors.selectPosts);
  const totalPage = useAppSelector(landingPageSelectors.selectTotalPage);

  const navigateToPostDetail = useCallback((postId: number) => {
    navigate(`/posts/${ postId }`);
  }, []);

  const handleChangePage = (e, value) => {
    if (page !== value) {
      setPage(value);
    }
  };

  const handleDeletePost = useCallback((postId: number) => {
    SweetAlert.fire({
      icon: 'warning',
      title: 'Confirm',
      showCancelButton: true,
      confirmButtonText: 'Yest',
      text: 'Are you sure to delete this post?',
    }).then((rs) => {
      if (rs.isConfirmed) {
        dispatch(adminActions.deletePost({ postId, currentPage: page, search: searchTitle }));
      }
    });
  }, []);

  useEffect(() => {
    dispatch(adminActions.getPostsForManagement({ page, search: searchTitle }));
    dispatch(landingPageActions.getTotalPage({ category: null, search: searchTitle, tag: null }));

    return () => {
      dispatch(adminActions.resetPostManagement());
    };
  }, [page, searchTitle]);

  // Handle search
  const handleSearchChange = (e): void => {
    if (!e.target.value && searchTitle) {
      setSearchTitle('');
    }
    setSearch(e.target.value);
  };

  const handleBlur = (): void => {
    setPage(1);
    setSearchTitle(search);
  };

  const handleKeyDown = (e): void => {
    if (e.code === 'Enter' && !e.altKey && !e.ctrlKey && !e.shiftKey) {
      handleBlur();
    }
  };

  const handleClear = useCallback(() => {
    setSearch('');
    setSearchTitle('');
  }, []);

  return (
    <>
      <Box className={styles.wrapper}>
        <AppHeading heading='List post' isDashboardHeading />
        <br />
        <Divider />
        <Box marginY={2}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='flex-start'
            spacing={2}
            marginY={1}>
            <TextField
              fullWidth
              value={search}
              placeholder='Search by title'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <AppIcon icon={Search} />
                  </InputAdornment>
                ),
                endAdornment: search ? (
                  <InputAdornment position='start'>
                    <AppIconButton
                      tooltip='Clear'
                      icon={<AppIcon icon={Close} />}
                      buttonColor='error'
                      onClick={handleClear}
                    />
                  </InputAdornment>
                ) : null,
              }}
              onChange={handleSearchChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </Stack>
          <AppTable
            data={posts}
            isEditRow={false}
            isDisplayMoreMenu
            searchByField='title'
            mappingClickField='id'
            rowConfigs={rowConfigs}
            isDisplaySearch={false}
            isFilterByOption={false}
            appTableCustomClass='pt-0'
            appTableContentClass='pt-0'
            headerConfigs={headerConfigs}
            onDeleteRow={handleDeletePost}
            onRowClick={navigateToPostDetail}
            searchPlaceholder='Search post by title'
          />
        </Box>
        {totalPage > 1 ? (
          <Stack marginY={2} alignItems='center' justifyContent='center'>
            <Pagination count={totalPage} color='primary' page={page} onChange={handleChangePage} />
          </Stack>
        ) : null}
      </Box>
    </>
  );
};

export default memo(PostsManagement);
