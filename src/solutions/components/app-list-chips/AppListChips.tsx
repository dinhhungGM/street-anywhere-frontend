import { Chip, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { AppIcon } from '../app-icon';

interface IAppListChipsProps {
  data?: string[];
  icon?: any;
  title?: string;
  iconColor?: string;
}
const AppListChips = ({ data = [], icon, title, iconColor = null }: IAppListChipsProps) => {
  return (
    <>
      {data && data.length ? (
        <Stack direction='row' alignItems='center'>
          <AppIcon icon={icon} color={iconColor} />
          <Typography fontWeight={700} marginLeft={1}>
            {title}:
          </Typography>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='flex-start'
            spacing={1}
            marginLeft={1}>
            {data.map((item, idx) => (
              <Chip key={idx} label={item} />
            ))}
          </Stack>
        </Stack>
      ) : null}
    </>
  );
};

export default memo(AppListChips);
