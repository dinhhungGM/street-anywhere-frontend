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
  customBackgroundColor?: string | null;
  ariaLabel?: string;
  onClick?: (e) => any;
  onMouseOver?: (e) => any;
  onMouseLeave?: (e) => any;
}
const AppIconButton = ({
  icon = null,
  tooltip = 'Tooltip',
  buttonSize = 'medium',
  buttonColor = 'primary',
  tooltipPlacement = 'bottom',
  customBackgroundColor = null,
  ariaLabel = null,
  onClick = (e) => {},
  onMouseOver = (e) => {},
  onMouseLeave = (e) => {},
}: IAppIconButtonProps) => {
  return (
    <>
      <Tooltip title={tooltip} placement={tooltipPlacement}>
        <IconButton
          size={buttonSize}
          color={buttonColor}
          onClick={onClick}
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
          aria-label={ariaLabel}
          sx={{
            backgroundColor: customBackgroundColor || 'initial',
            '&:hover': {
              backgroundColor: customBackgroundColor || 'initial',
            },
          }}>
          {icon}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default React.memo(AppIconButton);
