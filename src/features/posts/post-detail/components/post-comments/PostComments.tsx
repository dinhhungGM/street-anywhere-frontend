import { Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useMemo, useState, useRef } from 'react';
import SweetAlert from 'sweetalert2';
import * as yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AppIcon } from '../../../../../solutions/components/app-icon';
import { commentsActions, commentsSelectors } from '../../../../comments/store';
import styles from './styles.module.scss';

interface PostCommentsProps {
  postId?: number;
  currentUserId?: number;
}

const PostComments = ({ postId, currentUserId }: PostCommentsProps) => {
  const dispatch = useAppDispatch();
  const commentList = useAppSelector(commentsSelectors.selectCommentList);
  const commentCount = useAppSelector(commentsSelectors.selectCommentCount);
  const commentRef = useRef(null);
  const form = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (values.content.trim().length > 300) {
        SweetAlert.fire({
          title: 'Warning',
          icon: 'warning',
          text: 'The content of comment can not be more than 300 characters',
        });
      } else {
        dispatch(
          commentsActions.addComment({
            postId,
            userId: currentUserId,
            content: values.content.trim(),
            currentPage: pageNumber,
          }),
        );
        resetForm();
      }
    },
    validationSchema: yup.object({
      content: yup.string().required('Please enter your comment to continue').trim(),
    }),
  });
  const [pageNumber, setPageNumber] = useState(1);
  const deleteComment = (commentId): void => {
    SweetAlert.fire({
      title: 'Confirm',
      icon: 'question',
      text: 'Are you sure to delete your comment?',
      showCancelButton: true,
    }).then((status) => {
      if (status.isConfirmed) {
        dispatch(
          commentsActions.deleteCommentById({
            commentId,
            postId,
            currentPage: pageNumber,
          }),
        );
      }
    });
  };
  const updateCommentByCommentId = async (commentId: number, content: string) => {
    const { value: newContent } = await SweetAlert.fire({
      input: 'textarea',
      inputLabel: 'Enter your comment',
      inputPlaceholder: 'Your comment...',
      inputAttributes: {
        'aria-label': 'Your comment',
      },
      showCancelButton: true,
      inputValue: content,
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Please enter your comment to continue';
        }
        if (value.trim().length > 300) {
          return 'The comment can not be more than 300 characters';
        }
      },
    });
    if (newContent && newContent.trim() !== content) {
      dispatch(
        commentsActions.updateCommentByCommentId({
          commentId,
          content: newContent,
          postId,
          currentPage: pageNumber,
        }),
      );
    }
  };
  const handleChangePage = (_, page): void => {
    setPageNumber(page);
  };

  const scrollToCommentBox = (): void => {
    commentRef && commentRef.current.scrollIntoView();
  };
  const pageCount = useMemo(() => {
    const PAGE_SIZE = 6;
    return Math.ceil(commentCount / PAGE_SIZE);
  }, [commentCount]);

  useEffect(() => {
    if (!commentList.length && pageCount > 0) {
      setPageNumber(pageNumber - 1);
    }
  }, [commentList.length]);

  useEffect(() => {
    dispatch(commentsActions.getCommentListByPostId({ postId, page: pageNumber }));
    setTimeout(() => {
      scrollToCommentBox();
    }, 100);
  }, [pageNumber]);

  return (
    <>
      <Box ref={commentRef}>
        <Box>
          <form onSubmit={form.handleSubmit}>
            <FormControl fullWidth>
              <textarea
                rows={8}
                placeholder='Enter your comment'
                className={styles.control}
                {...form.getFieldProps('content')}
              ></textarea>
            </FormControl>
            <Stack justifyContent='flex-end' alignItems='center' paddingTop={2}>
              <Button type='submit' variant='contained' className={styles.btn} disabled={!(form.isValid && form.dirty)}>
                Comment
              </Button>
            </Stack>
          </form>
        </Box>
        <Box>
          <Typography variant='h4'>Comments {commentCount ? `(${commentCount})` : null}</Typography>
          <Divider></Divider>
          {commentCount ? (
            <>
              <List>
                {commentList.length &&
                  commentList.map((comment) => (
                    <ListItem key={comment.id} className={styles.comment}>
                      <Stack direction='row' alignItems='center' justifyContent='flex-start' spacing={2}>
                        <Avatar alt={comment?.user?.fullName} src={comment?.user?.profilePhotoUrl} />
                        <Box className={styles.content}>
                          <Stack direction='row' alignItems='center' justifyContent='space-between'>
                            <Stack direction='row' alignItems='center' justifyContent='flex-start' spacing={2}>
                              <Typography fontWeight={600} fontSize={16}>
                                {comment?.user?.fullName}
                              </Typography>
                              {currentUserId === comment?.userId && (
                                <>
                                  <IconButton
                                    color='info'
                                    size='small'
                                    onClick={() => updateCommentByCommentId(comment?.id, comment?.content)}
                                  >
                                    <AppIcon icon={Edit} color='#0288d1' />
                                  </IconButton>
                                  <IconButton color='error' size='small' onClick={() => deleteComment(comment?.id)}>
                                    <AppIcon icon={Delete} color='#e60023' />
                                  </IconButton>
                                </>
                              )}
                            </Stack>
                            <Typography fontSize={12} className={styles.date} fontStyle='italic'>
                              {comment?.isUpdated
                                ? `(Modified) ${new Date(comment?.updatedAt).toLocaleString()}`
                                : new Date(comment?.createdAt).toLocaleString()}
                            </Typography>
                          </Stack>
                          <Typography marginTop={1}>{comment?.content}</Typography>
                        </Box>
                      </Stack>
                    </ListItem>
                  ))}
              </List>
            </>
          ) : null}
          {pageCount ? (
            <Stack justifyContent='center' alignItems='center'>
              <Pagination count={pageCount} color='primary' page={pageNumber} onChange={handleChangePage} />
            </Stack>
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default PostComments;
