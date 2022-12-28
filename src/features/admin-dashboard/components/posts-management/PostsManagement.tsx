import { Box, Divider, Pagination, Stack } from '@mui/material';
import { memo, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppHeading } from '../../../../solutions/components/app-heading';
import { AppTable } from '../../../../solutions/components/app-table';
import { landingPageActions, landingPageSelectors } from '../../../landing-page/store';
import { adminActions, adminSelectors } from '../../store';
import { headerConfigs, rowConfigs } from './configs';
import styles from './styles.module.scss';

const PostsManagement = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(adminSelectors.selectPosts);
  const totalPage = useAppSelector(landingPageSelectors.selectTotalPage);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

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
        dispatch(adminActions.deletePost({ postId, currentPage: page }));
      }
    });
  }, []);

  useEffect(() => {
    dispatch(adminActions.getPostsForManagement(page));
    dispatch(landingPageActions.getTotalPage({ category: null, search: null, tag: null }));

    return () => {
      dispatch(adminActions.resetPostManagement());
    };
  }, [page]);

  return (
    <>
      <Box className={styles.wrapper}>
        <AppHeading heading='List post' isDashboardHeading />
        <br />
        <Divider />
        <Box marginY={2}>
          <AppTable
            data={posts}
            isEditRow={false}
            isDisplayMoreMenu
            searchByField='title'
            mappingClickField='id'
            rowConfigs={rowConfigs}
            isFilterByOption={false}
            headerConfigs={headerConfigs}
            onRowClick={navigateToPostDetail}
            searchPlaceholder='Search post by title'
            onDeleteRow={handleDeletePost}
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
