import { Search } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Box, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import _ from 'lodash';
import { memo, useCallback, useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppCardV2 } from '../../../../solutions/components/app-card-v2';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { AppIconButton } from '../../../../solutions/components/app-icon-button';
import { AppModal } from '../../../../solutions/components/app-modal';
import { AppReactions } from '../../../../solutions/components/app-reactions';
import { AppSelect } from '../../../../solutions/components/app-select';
import { IPost } from '../../../../solutions/models/postModels';
import { authSelectors } from '../../../auth/store';
import { bookmarkActions } from '../../../bookmark';
import { categoriesActions, categoriesSelectors } from '../../../categories/store';
import { ICategory } from '../../../categories/store/categoriesModels';
import { reactionsActions, reactionsSelectors } from '../../../reactions/store';
import { tagsActions, tagSelectors } from '../../../tags/store';
import { ITag } from '../../../tags/store/tagModels';
import { userActions, userSelectors } from '../../../user';
import { wrapperActions } from '../../../wrapper/store';
import { landingPageActions, landingPageSelectors } from '../../store';
import styles from './styles.module.scss';

const Gallery = () => {
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const posts = useAppSelector(landingPageSelectors.selectPosts);
  const followingUsers = useAppSelector(userSelectors.selectedFollowingUsers);
  const reactedPosts = useAppSelector(userSelectors.selectReactedPosts);
  const bookmarkedPosts = useAppSelector(userSelectors.selectBookmarkedPosts);
  const categories = useAppSelector(categoriesSelectors.selectCategoryList);
  const hashtags = useAppSelector(tagSelectors.selectTagList);
  const reactions = useAppSelector(reactionsSelectors.selectReactionList);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddReaction, setIsAddReaction] = useState<boolean>(false);
  const [clickedPost, setClickedPost] = useState<IPost | null>(null);
  const [search, setSearch] = useState('');

  const onCategoryDropDownChange = useCallback((e, values: ICategory[]): void => {
    if (values.length) {
      searchParams.set('category', _.map(values, 'id').toString());
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  }, []);

  const onHashTagDropDownChange = useCallback((e, values: ITag[]): void => {
    if (values.length) {
      searchParams.set('tag', _.map(values, 'id').toString());
    } else {
      searchParams.delete('tag');
    }
    setSearchParams(searchParams);
  }, []);

  const onSearchFieldChange = (e): void => {
    if (!e.target.value) {
      executeSearch(true);
    }
    setSearch(e.target.value);
  };

  const executeSearch = (event?: any): void => {
    if (search.trim() && typeof event !== 'boolean') {
      searchParams.set('search', search.trim());
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleKeyDown = (e): void => {
    if (e.code === 'Enter' && !e.altKey && !e.ctrlKey && !e.shiftKey) {
      executeSearch();
    }
  };

  const showAddReactionModal = useCallback((clickedPost: IPost) => {
    setIsAddReaction(true);
    setClickedPost(clickedPost);
  }, []);

  const hideAddReactionModal = useCallback((): void => {
    setIsAddReaction(false);
  }, []);

  const handleReactPost = useCallback(
    (reactionType: string) => {
      if (_.isNil(currentUser)) {
        SweetAlert.fire({
          title: 'Notification',
          icon: 'warning',
          text: 'You are not sign in',
        });
      } else {
        if (clickedPost) {
          if (reactionType === 'Remove') {
          } else {
            const reactionIcon = _.find(reactions, (item) => _.isEqual(item.reactionType, reactionType));
            if (reactionIcon) {
              dispatch(
                reactionsActions.addReaction({
                  postId: clickedPost?.id,
                  reactionId: reactionIcon?.id,
                  userId: currentUser?.id,
                }),
              );
            } else {
              SweetAlert.fire({
                title: 'Notification',
                icon: 'error',
                text: 'Something are wrong. Please contact administrator to support',
              });
            }
          }
        }
      }
      hideAddReactionModal();
    },
    [clickedPost],
  );

  const toggleBookmark = useCallback((post: IPost) => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Notification',
        icon: 'warning',
        text: 'You are not sign in',
      });
    } else {
      if (post.isBookmarked) {
        dispatch(bookmarkActions.unBookmark({ bookmarkId: post?.bookmarkedDetail.bookmarkId }));
      } else {
        dispatch(
          bookmarkActions.createBookmark({
            postId: post?.id,
            userId: currentUser?.id,
          }),
        );
        dispatch(
          wrapperActions.createNewNotification({
            postId: post?.id,
            type: 'bookmarked',
            reactionType: null,
            userId: currentUser?.id,
          }),
        );
      }
    }
  }, []);

  const toggleFollow = useCallback((post) => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Notification',
        icon: 'warning',
        text: 'You are not sign in',
      });
    } else {
      dispatch(userActions.followUser({ userId: currentUser?.id, followerId: post?.userId }));
    }
  }, []);

  useEffect(() => {
    dispatch(
      landingPageActions.getPostsAsync({
        page: searchParams.get('page'),
        search: searchParams.get('search'),
        category: searchParams.get('category'),
        tag: searchParams.get('tag'),
      }),
    );
  }, [searchParams]);

  useEffect(() => {
    dispatch(categoriesActions.getCategoryList());
    dispatch(tagsActions.getTagList());
    dispatch(reactionsActions.getReactionList());
    if (currentUser) {
      dispatch(userActions.getFollowingUsers(currentUser?.id));
      dispatch(userActions.getBookmarkedPost(currentUser?.id));
      dispatch(userActions.getReactedPost(currentUser?.id));
    }
  }, []);

  const displayPosts = useMemo(() => {
    if (_.isNil(currentUser)) {
      return posts;
    } else {
      return _.map(posts, (post) => {
        const reactedDetail = _.find(reactedPosts, (reactedPost) => reactedPost.postId === post.id);
        const bookmarkedDetail = _.find(bookmarkedPosts, (bookmarkedPost) => bookmarkedPost.postId === post.id);
        const followingDetail = _.find(followingUsers, (followingUser) => followingUser.followerId === post.userId);
        return {
          ...post,
          reactedDetail,
          isReacted: !!reactedDetail,
          bookmarkedDetail,
          isBookmarked: !!bookmarkedDetail,
          followingDetail,
          isFollowingUser: !!followingDetail,
        };
      });
    }
  }, [currentUser, posts, followingUsers, reactedPosts, bookmarkedPosts]);

  return (
    <>
      <Box className={styles.gallery}>
        <Box
          padding={2}
          marginY={2}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '12px',
          }}>
          <Grid container spacing={2} alignItems='center' justifyContent='center'>
            <Grid item xs={12} sm={12} md={8}>
              <TextField
                fullWidth
                label='Search'
                placeholder='Search by title, author, ...'
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <AppIconButton
                        tooltip='Search'
                        icon={<AppIcon icon={Search} />}
                        buttonSize='large'
                        buttonColor='primary'
                      />
                    </InputAdornment>
                  ),
                }}
                value={search}
                onChange={onSearchFieldChange}
                onBlur={executeSearch}
                onKeyDown={handleKeyDown}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <AppSelect
                maxItem={1}
                isMultipleSelect
                data={categories}
                optionLabel='Category'
                mappingLabelField='categoryName'
                onChange={onCategoryDropDownChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <AppSelect
                maxItem={1}
                data={hashtags}
                isMultipleSelect
                optionLabel='Hashtag'
                mappingLabelField='tagName'
                onChange={onHashTagDropDownChange}
              />
            </Grid>
          </Grid>
        </Box>
        <Masonry
          columns={{ xs: 1, sm: 3, md: 4, lg: 5, xl: 6 }}
          spacing={2}
          sx={{
            width: '100%',
          }}>
          {displayPosts &&
            displayPosts.map((post) => (
              <Box
                sx={{
                  margin: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                key={post?.id}>
                <AppCardV2
                  post={post}
                  currentUserId={currentUser?.id}
                  onReact={showAddReactionModal}
                  onBookmark={toggleBookmark}
                  onFollow={toggleFollow}
                />
              </Box>
            ))}
        </Masonry>
        <AppModal
          title='Add reaction'
          isOpen={isAddReaction}
          onClose={hideAddReactionModal}
          isDisplayCancelButton={false}
          isDisplayOkButton={false}
          width='fit-content'>
          <Stack alignItems='center' justifyContent='center'>
            <AppReactions onClickReactionIcon={handleReactPost} />
          </Stack>
        </AppModal>
      </Box>
    </>
  );
};

export default memo(Gallery);
