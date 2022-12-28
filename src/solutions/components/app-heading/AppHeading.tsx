import { Dashboard, Label } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import randomColor from 'randomcolor';
import { memo } from 'react';
import { AppIcon } from '../app-icon';

interface IAppHeadingProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  heading?: string;
  isDashboardHeading?: boolean;
}
const AppHeading = ({ variant = 'h4', heading, isDashboardHeading = false }: IAppHeadingProps) => {
  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='flex-start' spacing={1}>
        <AppIcon
          icon={isDashboardHeading ? Dashboard : Label}
          color={randomColor({ luminosity: 'dark' })}
          fontSize={48}
        />
        <Typography variant={variant} fontWeight={700}>
          {heading}
        </Typography>
      </Stack>
    </>
  );
};

export default memo(AppHeading);
