import { Box, Chip, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { landingPageActions, landingPageSelectors } from '../../store';

const TagClouds = () => {
  const dispatch = useAppDispatch();
  const displayCategories = useAppSelector(landingPageSelectors.selectTags);

  useEffect(() => {
    dispatch(landingPageActions.getAllTagsAsync(null));
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
          {displayCategories?.map((tag) => (
            <Chip label={tag.tagName} key={tag.id} variant='outlined' />
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default TagClouds;
