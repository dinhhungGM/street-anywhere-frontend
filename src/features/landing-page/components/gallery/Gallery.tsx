import { Close, Search } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Box, Grid, InputAdornment, TextField } from '@mui/material';
import _ from 'lodash';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppCardV2 } from '../../../../solutions/components/app-card-v2';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { AppIconButton } from '../../../../solutions/components/app-icon-button';
import { AppSelect } from '../../../../solutions/components/app-select';
import { IPost } from '../../../../solutions/models/postModels';
import { authSelectors } from '../../../auth/store';
import { bookmarkActions } from '../../../bookmark';
import { categoriesActions, categoriesSelectors } from '../../../categories/store';
import { ICategory } from '../../../categories/store/categoriesModels';
import { reactionsActions } from '../../../reactions/store';
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
  const bookmarkedPosts = useAppSelector(userSelectors.selectBookmarkedPosts);
  const categories = useAppSelector(categoriesSelectors.selectCategoryList);
  const hashtags = useAppSelector(tagSelectors.selectTagList);
  const totalPage = useAppSelector(landingPageSelectors.selectTotalPage);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTitle, setSearchTitle] = useState('');
  const [searchCategories, setSearchCategories] = useState<ICategory[]>([]);
  const [searchHashtags, setSearchHashtags] = useState<ITag[]>([]);
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  //#region Handling search

  const onCategoryDropDownChange = useCallback((e, values: ICategory[]): void => {
    setSearchCategories(values);
  }, []);

  const onHashTagDropDownChange = useCallback((e, values: ITag[]): void => {
    setSearchHashtags(values);
  }, []);

  const onSearchFieldChange = (e): void => {
    setSearchTitle(e.target.value);
  };

  const handleBlur = (): void => {
    setSearch(searchTitle);
  };

  const handleKeyDown = (e): void => {
    if (e.code === 'Enter' && !e.altKey && !e.ctrlKey && !e.shiftKey) {
      handleBlur();
    }
  };

  const clearSearch = (e): void => {
    e.stopPropagation();
    if (search) {
      setSearch('');
    }
    setSearchTitle('');
  };

  //#endregion

  //#region Handing bookmark

  const toggleBookmark = useCallback((post: IPost) => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Notification',
        icon: 'warning',
        text: 'You are not sign in',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/sign-in');
        }
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

  //#endregion

  //#region Handling follow

  const toggleFollow = useCallback((post: IPost) => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Notification',
        icon: 'warning',
        text: 'You are not sign in',
        confirmButtonText: 'Sign in',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/sign-in');
        }
      });
    } else {
      if (post.isFollowingUser) {
        dispatch(
          userActions.unfollowUser({
            userId: post?.followingDetail?.userId,
            followerId: post?.followingDetail?.followerId,
          }),
        );
      } else {
        dispatch(userActions.followUser({ userId: currentUser?.id, followerId: post?.userId }));
        if (currentUser?.id !== post?.userId) {
          dispatch(
            wrapperActions.createNewNotification({
              postId: post?.id,
              userId: currentUser?.id,
              type: 'followed',
              reactionType: null,
            }),
          );
        }
      }
    }
  }, []);

  //#endregion

  //#region Calling API

  useEffect(() => {
    dispatch(
      landingPageActions.getPostsAsync({
        page: searchParams.get('page'),
        search: searchParams.get('search'),
        category: searchParams.get('category'),
        tag: searchParams.get('tag'),
      }),
    );
    dispatch(landingPageActions.getTotalPage());
  }, [searchParams]);

  useEffect(() => {
    // Pagination
    searchParams.set('page', page.toString());
    // Search by title
    if (searchParams.has('search') && !search.trim()) {
      searchParams.delete('search');
    } else {
      search.trim() && searchParams.set('search', search);
    }
    // Search by categories
    if (searchParams.has('category') && !searchCategories?.length) {
      searchParams.delete('category');
    } else if (searchCategories?.length) {
      const cateIds = _.map(searchCategories, 'id');
      searchParams.set('category', cateIds.toString());
    }
    // Search by hashtags
    if (searchParams.has('tag') && !searchHashtags?.length) {
      searchParams.delete('tag');
    } else if (searchHashtags?.length) {
      const tagIds = _.map(searchHashtags, 'id');
      searchParams.set('tag', tagIds.toString());
    }
    setSearchParams(searchParams);
  }, [search, searchCategories, searchHashtags, page]);

  useEffect(() => {
    dispatch(categoriesActions.getCategoryList());
    dispatch(tagsActions.getTagList());
    dispatch(reactionsActions.getReactionList());
    if (currentUser) {
      dispatch(userActions.getFollowingUsers(currentUser?.id));
      dispatch(userActions.getBookmarkedPost(currentUser?.id));
    }

    const loadMore = (): void => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.scrollingElement.scrollHeight / 2 &&
        page < totalPage
      ) {
        const newPage = page + 1;
        setTimeout(() => {
          setPage(newPage);
        }, 100);
      }
    };
    window.addEventListener('scroll', loadMore);
    return () => {
      dispatch(userActions.resetAllData());
      dispatch(landingPageActions.resetLandingPage());
      window.removeEventListener('scroll', loadMore);
    };
  }, []);

  //#endregion

  //#region Handing build display posts

  const displayPosts = useMemo(() => {
    if (_.isNil(currentUser)) {
      return posts;
    } else {
      return _.map(posts, (post) => {
        const bookmarkedDetail = _.find(
          bookmarkedPosts,
          (bookmarkedPost) => bookmarkedPost.postId === post.id,
        );
        const followingDetail = _.find(
          followingUsers,
          (followingUser) => followingUser.followerId === post.userId,
        );
        return {
          ...post,
          bookmarkedDetail,
          isBookmarked: !!bookmarkedDetail,
          followingDetail,
          isFollowingUser: !!followingDetail,
        };
      });
    }
  }, [currentUser, posts, followingUsers, bookmarkedPosts]);

  //#endregion

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
                placeholder='Search by title, ...'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='end'>
                      <AppIconButton
                        tooltip='Search'
                        icon={<AppIcon icon={Search} />}
                        buttonSize='large'
                        buttonColor='primary'
                      />
                    </InputAdornment>
                  ),
                  endAdornment: search && (
                    <InputAdornment position='end'>
                      <AppIconButton
                        tooltip='Clear'
                        icon={<AppIcon icon={Close} />}
                        buttonSize='large'
                        buttonColor='error'
                        onClick={clearSearch}
                      />
                    </InputAdornment>
                  ),
                }}
                value={searchTitle}
                onChange={onSearchFieldChange}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              {categories ? (
                <AppSelect
                  maxItem={1}
                  isMultipleSelect
                  data={categories}
                  optionLabel='Category'
                  mappingLabelField='categoryName'
                  onChange={onCategoryDropDownChange}
                />
              ) : null}
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              {hashtags ? (
                <AppSelect
                  maxItem={1}
                  data={hashtags}
                  isMultipleSelect
                  optionLabel='Hashtag'
                  mappingLabelField='tagName'
                  onChange={onHashTagDropDownChange}
                />
              ) : null}
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
                  onBookmark={toggleBookmark}
                  onFollow={toggleFollow}
                />
              </Box>
            ))}
        </Masonry>
      </Box>
    </>
  );
};

export default memo(Gallery);
