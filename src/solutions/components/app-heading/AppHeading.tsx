import { memo } from 'react';
import randomColor from 'randomcolor';
import { Stack, Typography } from '@mui/material';
import { AppIcon } from '../app-icon';
import { Label } from '@mui/icons-material';

interface IAppHeadingProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  heading?: string;
}
const AppHeading = ({ variant = 'h4', heading }: IAppHeadingProps) => {
  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='flex-start' spacing={1}>
        <AppIcon icon={Label} color={randomColor({ luminosity: 'dark' })} fontSize={48} />
        <Typography variant={variant} fontWeight={700}>
          {heading}
        </Typography>
      </Stack>
    </>
  );
};

export default memo(AppHeading);
