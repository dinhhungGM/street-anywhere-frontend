import { Widgets } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { AppIcon } from '../app-icon';

interface IAppInfoWidgetProps {
  icon?: any;
  width?: number;
  title?: string;
  height?: number;
  iconSize?: number;
  iconColor?: string;
  coverImage?: string;
  value?: string | number | null;
  replaceText?: string;
}
const AppInfoWidget = ({
  iconColor,
  width = 160,
  value = null,
  iconSize = 40,
  icon = Widgets,
  title = 'Title',
  replaceText = '',
  coverImage = 'unset',
}: IAppInfoWidgetProps) => {
  return (
    <>
      <Box
        component={Paper}
        elevation={2}
        sx={{
          width: `${width}px`,
          background: coverImage,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px',
        }}
      >
        <AppIcon icon={icon} fontSize={iconSize} color={iconColor} />
        <Typography variant='h3' paddingY={3}>
          {`${value.toString()}`.length > 4 ? replaceText : value}
        </Typography>
        <Typography variant='h6'>{title}</Typography>
      </Box>
    </>
  );
};

export default React.memo(AppInfoWidget);
