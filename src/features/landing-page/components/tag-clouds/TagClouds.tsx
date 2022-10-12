import { Box, Chip, Stack, Typography } from '@mui/material';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { tagsActions, tagSelectors } from '../../../tags/store';
import styles from './styles.module.scss';

const TagClouds = () => {
  const dispatch = useAppDispatch();
  const categoryList = useAppSelector(tagSelectors.selectTagList);
  const [queryParams, setQueryParams] = useSearchParams();
  const [toggle, setToggle] = useState(false);

  const checkIsActive = (tagId: number): boolean => {
    const currentTagId = queryParams.get('tag');
    return tagId && tagId === +currentTagId;
  };

  const filterPostByTag = (tagId: string) => {
    if (!toggle) {
      queryParams.set('tag', tagId);
    } else {
      queryParams.delete('tag');
    }
    setQueryParams(queryParams);
    setToggle(!toggle);
  };

  useEffect(() => {
    dispatch(tagsActions.getTagList());
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '12px',
        }}
      >
        <Typography variant='h5'>Tag Clouds</Typography>
        <Stack
          direction='row'
          flexWrap='wrap'
          justifyContent='flex-start'
          alignItems='center'
          gap={1}
          alignContent='flex-start'
          marginTop={3}
        >
          {categoryList?.map((tag) => (
            <Chip
              label={tag.tagName}
              key={tag.id}
              variant='outlined'
              className={cx(styles.tag, checkIsActive(+tag.id) && styles.active)}
              onClick={() => filterPostByTag(tag.id.toString())}
            />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default TagClouds;
