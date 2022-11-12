import { AddReaction } from '@mui/icons-material';
import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import { AppIcon } from '../app-icon';

const AppReactionProgress = () => {
  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='flex-start'>
        <Box width='10%'>
          <Typography>Label</Typography>
        </Box>
        <Box width='90%'>
          <LinearProgress value={80} variant='determinate' />
        </Box>
      </Stack>
    </>
  );
};

export default React.memo(AppReactionProgress);
