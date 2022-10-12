import { Category } from '@mui/icons-material';
import { Box, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { AppIcon } from '../../../app-icon';

interface IAppCardCategoriesProps {
  categories?: string[];
}
const AppCardCategories = ({ categories }: IAppCardCategoriesProps) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: '8px',
        }}
      >
        <AppIcon icon={Category}></AppIcon>
        <Typography fontWeight={700}>Categories: </Typography>
        <Stack direction='row' spacing={1} marginLeft={1} flexWrap='wrap'>
          {categories.map((category) => (
            <>
              <Chip key={category} label={category} size='small' />
            </>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default React.memo(AppCardCategories);
