import { Box, Stack, Avatar, Typography, CircularProgress, Pagination, Paper } from '@mui/material';
import { memo, useState, useEffect, useMemo } from 'react';
import { default as axios } from './../../services/axios';
import SweetAlert from 'sweetalert2';
import _ from 'lodash';

interface IAppUserCommentProps {
  postId: number;
}
const AppUserComment = ({ postId }: IAppUserCommentProps) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const handleChangePage = (_, page): void => {
    setPageNumber(page);
  };

  const pageCount = useMemo(() => {
    if (_.isNil(data)) {
      return null;
    }
    const PAGE_SIZE = 6;
    return Math.ceil(data.commentCount / PAGE_SIZE);
  }, [data]);

  useEffect(() => {
    const getUserCommented = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/comments/post/${ postId }?page=${ pageNumber }`);
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
    getUserCommented();
  }, [postId, pageNumber]);

  return (
    <>
      <Box
        marginY={2}
        sx={{
          width: '100%',
          height: '100%',
          maxHeight: '600px',
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: '0 16px',
          borderRadius: 2,
        }}>
        {isLoading ? (
          <Stack alignItems='center' justifyContent='center' paddingY={4}>
            <CircularProgress color='primary' />
          </Stack>
        ) : _.isNil(data) ? (
          <Typography textAlign='center' fontWeight={600}>
            No comments found
          </Typography>
        ) : (
          <>
            {data &&
              data.commentCount &&
              data.commentList.map((comment) => (
                <Box
                  key={comment.id}
                  marginY={1}
                  padding={2}
                  sx={{
                    backgroundColor: '#f2f5f8',
                    borderRadius: 2,
                  }}
                  component={Paper}>
                  <Stack direction='row' alignItems='center' justifyContent='flex-start' spacing={2}>
                    <Avatar src={comment.user.profilePhotoUrl} />
                    <Box>
                      <Typography fontWeight={700}>{comment.user.fullName}</Typography>
                      <Typography>
                        {comment.isUpdated
                          ? new Date(comment.updatedAt).toLocaleString()
                          : new Date(comment.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                  </Stack>
                  <Box
                    marginTop={1}
                    padding={1}
                    sx={{
                      backgroundColor: '#fff',
                      borderRadius: 2,
                    }}>
                    <Typography>{comment.content}</Typography>
                  </Box>
                </Box>
              ))}
            <Box marginBottom={2}>
              {pageCount > 1 ? (
                <Stack justifyContent='center' alignItems='center'>
                  <Pagination count={pageCount} color='primary' page={pageNumber} onChange={handleChangePage} />
                </Stack>
              ) : null}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default memo(AppUserComment);
