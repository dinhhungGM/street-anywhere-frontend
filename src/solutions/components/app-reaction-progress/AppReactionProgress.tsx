import { Box, LinearProgress, Stack, Typography } from '@mui/material';
import React from 'react';
import randomColor from 'randomcolor';

interface AppReactionProgressProps {
  label?: string;
  progressValue: number;
}
const AppReactionProgress = ({ label = 'Label', progressValue }: AppReactionProgressProps) => {
  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='flex-start'>
        <Box width='10%'>
          <Typography>{label}</Typography>
        </Box>
        <Box
          width='80%'
          sx={{
            color: randomColor({ format: 'hex', luminosity: 'dark' }),
          }}>
          <LinearProgress value={progressValue} variant='determinate' color='inherit' />
        </Box>
        <Box width='10%' marginLeft={2}>
          <Typography>{progressValue}%</Typography>
        </Box>
      </Stack>
    </>
  );
};

export default React.memo(AppReactionProgress);
