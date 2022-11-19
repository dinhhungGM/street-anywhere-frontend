import { Widgets } from '@mui/icons-material';
import { Box, Paper, Typography } from '@mui/material';
import React from 'react';
import { AppIcon } from '../app-icon';
import CountUp from 'react-countup';
import styles from './styles.module.scss';
import { AppModal } from '../app-modal';
interface IAppInfoWidgetProps {
  icon?: any;
  width?: number;
  title?: string;
  height?: number;
  iconSize?: number;
  iconColor?: string;
  coverImage?: string;
  isInteractive?: boolean;
  value?: string | number | null;
  onClick?: () => void;
}
const AppInfoWidget = ({
  iconColor,
  width = 160,
  value = null,
  iconSize = 40,
  icon = Widgets,
  title = 'Title',
  coverImage = 'unset',
  isInteractive = false,
  onClick = () => {},
}: IAppInfoWidgetProps) => {
  return (
    <>
      <Box
        component={Paper}
        elevation={2}
        sx={{
          width: `${ width }px`,
          background: coverImage,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px',
          cursor: isInteractive ? 'pointer' : 'initial',
        }}
        onClick={onClick}
        className={isInteractive ? styles['hoverable-box'] : null}>
        <AppIcon icon={icon} fontSize={iconSize} color={iconColor} />
        <Typography variant='h3' paddingY={3}>
          <CountUp end={+value} />
        </Typography>
        <Typography variant='h6'>{title}</Typography>
      </Box>
    </>
  );
};

export default React.memo(AppInfoWidget);
