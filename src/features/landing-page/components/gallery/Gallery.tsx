import { Search } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Box, Grid, InputAdornment, Stack, TextField } from '@mui/material';
import _ from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
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
import { landingPageActions, landingPageSelectors } from '../../store';
import styles from './styles.module.scss';

const Gallery = () => {
  const currentUser = useAppSelector(authSelectors.selectCurrentUser);
  const displayPosts = useAppSelector(landingPageSelectors.selectPosts);
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

  const addReaction = useCallback(
    (reactionType) => {
      if (_.isNil(currentUser)) {
        SweetAlert.fire({
          title: 'Notification',
          icon: 'warning',
          text: 'You are not sign in',
        });
      } else {
        if (clickedPost) {
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
      hideAddReactionModal();
    },
    [clickedPost],
  );

  const toggleBookmark = useCallback((post) => {
    if (_.isNil(currentUser)) {
      SweetAlert.fire({
        title: 'Notification',
        icon: 'warning',
        text: 'You are not sign in',
      });
    } else {
      dispatch(
        bookmarkActions.createBookmark({
          postId: post?.id,
          userId: currentUser?.id,
        }),
      );
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
  }, []);

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
                <AppCardV2 post={post} onReact={showAddReactionModal} onBookmark={toggleBookmark} />
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
            <AppReactions onClickReactionIcon={addReaction} />
          </Stack>
        </AppModal>
      </Box>
    </>
  );
};

export default memo(Gallery);
