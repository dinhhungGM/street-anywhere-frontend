import { Edit } from '@mui/icons-material';
import { Stack, Typography } from '@mui/material';
import React from 'react';
import { AppIcon } from '../app-icon';
import { AppIconButton } from '../app-icon-button';

interface IAppProfileInfoProps {
  icon: any;
  label: string;
  value: string;
  isLink?: boolean;
  isEdit?: boolean;
  onEdit?: (e) => any;
}
const AppProfileInfo = ({
  icon,
  label,
  value,
  isEdit = false,
  isLink = false,
  onEdit = (e) => null,
}: IAppProfileInfoProps) => {
  return (
    <>
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Stack direction='row' alignItems='center' padding={2} justifyContent='space-between' spacing={12}>
          <Stack spacing={1} direction='row' alignItems='center'>
            <AppIcon icon={icon} />
            <Typography fontWeight={700}>{label}:</Typography>
          </Stack>
          <Stack direction='row' spacing={2} alignItems='center' justifySelf='flex-start'>
            {isLink ? (
              <Typography component='a' href={value}>
                {value}
              </Typography>
            ) : (
              <Typography>{value}</Typography>
            )}
          </Stack>
        </Stack>
        {isEdit && <AppIconButton tooltip='Update' icon={<AppIcon icon={Edit} />} onClick={onEdit}></AppIconButton>}
      </Stack>
    </>
  );
};

export default React.memo(AppProfileInfo);
