import { Search } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import _ from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { AppCardV2 } from '../../../../solutions/components/app-card-v2';
import { AppIcon } from '../../../../solutions/components/app-icon';
import { AppModal } from '../../../../solutions/components/app-modal';
import { AppReactions } from '../../../../solutions/components/app-reactions';
import { AppSelect } from '../../../../solutions/components/app-select';
import { categoriesActions, categoriesSelectors } from '../../../categories/store';
import { ICategory } from '../../../categories/store/categoriesModels';
import { reactionsActions, reactionsSelectors } from '../../../reactions/store';
import { tagsActions, tagSelectors } from '../../../tags/store';
import { ITag } from '../../../tags/store/tagModels';
import { landingPageActions, landingPageSelectors } from '../../store';
import { IPost } from '../../../../solutions/models/postModels';

const Gallery = () => {
  const displayPosts = useAppSelector(landingPageSelectors.selectPosts);
  const categories = useAppSelector(categoriesSelectors.selectCategoryList);
  const hashtags = useAppSelector(tagSelectors.selectTagList);
  const reactions = useAppSelector(reactionsSelectors.selectReactionList);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAddReaction, setIsAddReaction] = useState<boolean>(false);
  const [clickedPost, setClickedPost] = useState<IPost | null>(null);

  const onCategoryDropDownChange = useCallback((e, values: ICategory[]): void => {
    if (values.length) {
      const ids = _.map(values, 'id').join(',');
      searchParams.set('category', ids);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  }, []);

  const onHashTagDropDownChange = useCallback((e, values: ITag[]): void => {
    if (values.length) {
      values.forEach((hashtag) => {
        if (searchParams.get('hashtag')) {
          searchParams.append('hashtag', hashtag.id.toString());
        } else {
          searchParams.set('hashtag', hashtag.id.toString());
        }
      });
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  }, []);

  const showAddReactionModal = useCallback((clickedPost: IPost) => {
    setIsAddReaction(true);
    setClickedPost(clickedPost);
  }, []);

  const hideAddReactionModal = (): void => {
    setIsAddReaction(false);
  };

  const addReaction = useCallback((reactionType) => {
    if (clickedPost) {
    }
    hideAddReactionModal();
  }, []);

  useEffect(() => {
    dispatch(
      landingPageActions.getPostsAsync({
        page: searchParams.get('page'),
        category: searchParams.get('category'),
        tag: searchParams.get('tag'),
      }),
    );
  }, []);

  useEffect(() => {
    dispatch(categoriesActions.getCategoryList());
    dispatch(tagsActions.getTagList());
    dispatch(reactionsActions.getReactionList());
  }, []);

  return (
    <>
      {displayPosts?.length ? (
        <Box
          sx={{
            height: 'fit-content',
            maxHeight: '1200px',
            overflowX: 'hidden',
            overflowY: 'scroll',
            padding: '12px',
            width: '100%',
          }}>
          <Box
            padding={2}
            marginY={2}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '12px',
            }}>
            <Grid container spacing={2} alignItems='center' justifyContent='center'>
              <Grid item xs={12} sm={12} md={7}>
                <TextField fullWidth label='Search' placeholder='Search by title, author, ...' />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <AppSelect
                  data={categories}
                  isMultipleSelect
                  optionLabel='Category'
                  mappingLabelField='categoryName'
                  maxItem={1}
                  onChange={onCategoryDropDownChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <AppSelect
                  data={hashtags}
                  isMultipleSelect
                  optionLabel='Hashtag'
                  mappingLabelField='tagName'
                  maxItem={1}
                  onChange={onHashTagDropDownChange}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={1}>
                <Button
                  fullWidth
                  variant='contained'
                  startIcon={<AppIcon icon={Search} color='#fff' />}
                  sx={{
                    paddingY: '14px',
                  }}>
                  Search
                </Button>
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
                  <AppCardV2 post={post} onReact={showAddReactionModal} />
                </Box>
              ))}
          </Masonry>
          <AppModal
            title='Add reaction'
            isOpen={isAddReaction}
            onClose={hideAddReactionModal}
            onCancel={hideAddReactionModal}
            isDisplayCancelButton
            isDisplayOkButton={false}>
            <Stack alignItems='center' justifyContent='center'>
              <AppReactions onClickReactionIcon={addReaction} />
            </Stack>
          </AppModal>
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <AppIcon icon={Search} fontSize={120} />
          <Typography variant='h6' marginY={4}>
            No data found
          </Typography>
        </Box>
      )}
    </>
  );
};

export default memo(Gallery);
