import { Box, CircularProgress, Stack } from '@mui/material';
import { memo } from 'react';

interface IAppInnerLoadingProps {
  height?: string;
  isShowLoading: boolean;
}
const AppInnerLoading = ({ height = '100%', isShowLoading }: IAppInnerLoadingProps) => {
  return (
    <>
      {isShowLoading && (
        <Box
          sx={{
            height,
            width: '100%',
          }}>
          <Stack alignItems='center' justifyContent='center' padding={4}>
            <CircularProgress />
          </Stack>
        </Box>
      )}
    </>
  );
};

export default memo(AppInnerLoading);
