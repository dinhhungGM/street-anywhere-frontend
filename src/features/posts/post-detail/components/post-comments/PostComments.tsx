import { Delete, Edit } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useEffect } from 'react';
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
  const form = useFormik({
    initialValues: {
      content: '',
    },
    onSubmit: (values, { resetForm }) => {
      dispatch(
        commentsActions.addComment({
          postId,
          userId: currentUserId,
          content: values.content,
        }),
      );
      resetForm();
    },
    validationSchema: yup.object({
      content: yup.string().required('Please enter your comment to continue'),
    }),
  });
  useEffect(() => {
    dispatch(commentsActions.getCommentListByPostId(postId));
  }, []);
  return (
    <>
      <Box>
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
          <Typography variant='h4'>Comments</Typography>
          <Divider></Divider>
          {commentList.length && (
            <>
              <List>
                {commentList.map((comment) => (
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
                                <IconButton color='info' size='small'>
                                  <AppIcon icon={Edit} color='#0288d1' />
                                </IconButton>
                                <IconButton color='error' size='small'>
                                  <AppIcon icon={Delete} color='#e60023' />
                                </IconButton>
                              </>
                            )}
                          </Stack>
                          <Typography fontSize={12} className={styles.date}>
                            {new Date(comment?.createdAt).toLocaleString()}
                          </Typography>
                        </Stack>
                        <Typography marginTop={1}>{comment?.content}</Typography>
                      </Box>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PostComments;
