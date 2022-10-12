import { Tag } from '@mui/icons-material';
import { Box, Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { AppIcon } from '../../../app-icon';

interface IAppCardTagsProps {
  tags?: string[];
}
const AppCardTags = ({ tags }: IAppCardTagsProps) => {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: '8px',
        }}
      >
        <AppIcon icon={Tag}></AppIcon>
        <Typography fontWeight={700}>Tags: </Typography>
        <Stack direction='row' spacing={1} marginLeft={1} flexWrap='wrap'>
          {tags.map((tag) => (
            <>
              <Chip key={tag} label={tag} size='small' />
            </>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default React.memo(AppCardTags);
