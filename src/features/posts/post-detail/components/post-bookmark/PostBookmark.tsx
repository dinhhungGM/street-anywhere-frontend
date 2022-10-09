import { Bookmark } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import _ from 'lodash';
import { memo, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { AppIcon } from '../../../../../solutions/components/app-icon';
import { IBookmarkDetail } from '../../../../../solutions/models/postModels';
import { postActions, postSelectors } from '../../../store';

interface IPostBookmarkProps {
  currentUserId?: number;
  postId?: number;
}

const PostBookmark = ({ currentUserId, postId }: IPostBookmarkProps) => {
  const dispatch = useAppDispatch();
  const [currentBookmark, setCurrentBookmark] = useState<IBookmarkDetail | null>(null);
  const [isReload, setIsReload] = useState(false);
  const bookmarkDetails = useAppSelector(postSelectors.selectBookmarkDetails);

  const savePostToBookmark = async () => {
    let res;
    if (currentBookmark) {
      res = await dispatch(postActions.deleteBookmark(currentBookmark.bookmarkId));
    } else {
      res = await dispatch(
        postActions.savePostToBookmark({
          postId: postId,
          userId: currentUserId,
        }),
      );
    }
    if (res.meta.requestStatus === 'fulfilled') {
      setIsReload(!isReload);
    }
  };

  useEffect(() => {
    dispatch(postActions.getBookmarkDetailsByPostId(postId));
  }, [isReload]);

  useEffect(() => {
    const bookmark = _.find(bookmarkDetails?.bookmarkDetails, (detail) => detail?.userId === currentUserId);
    console.log('Bookmark', bookmark);
    setCurrentBookmark(bookmark);
  }, [bookmarkDetails]);

  return (
    <>
      <Box>
        <Button
          fullWidth
          startIcon={<AppIcon component={Bookmark} color={!!currentBookmark ? '#fff' : '#9c27b0'} />}
          size='large'
          variant={!!currentBookmark ? 'contained' : 'outlined'}
          color='secondary'
          onClick={savePostToBookmark}
        >
          Bookmark
        </Button>
      </Box>
    </>
  );
};

export default memo(PostBookmark);
