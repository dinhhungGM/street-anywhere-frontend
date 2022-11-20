import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

interface IAppIconButtonProps {
  icon?: any;
  tooltip?: string;
  tooltipPlacement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  buttonSize?: 'small' | 'medium' | 'large';
  buttonColor?: 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  onClick?: (e) => any;
}
const AppIconButton = ({
  icon = null,
  tooltip = 'Tooltip',
  buttonSize = 'medium',
  buttonColor = 'primary',
  tooltipPlacement = 'bottom',
  onClick = (e) => {},
}: IAppIconButtonProps) => {
  return (
    <>
      <Tooltip title={tooltip} placement={tooltipPlacement}>
        <IconButton size={buttonSize} color={buttonColor} onClick={onClick}>
          {icon}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default React.memo(AppIconButton);
