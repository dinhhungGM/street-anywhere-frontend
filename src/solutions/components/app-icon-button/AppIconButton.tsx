import { IconButton, Tooltip } from '@mui/material';
import React from 'react';

interface IAppIconButtonProps {
  icon?: any;
  tooltip?: string;
  buttonSize?: 'small' | 'medium' | 'large';
  buttonColor?: 'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  onClick: (e) => any;
}
const AppIconButton = ({
  icon,
  tooltip,
  buttonSize,
  buttonColor = 'primary',
  onClick = (e) => {},
}: IAppIconButtonProps) => {
  return (
    <>
      <Tooltip title={tooltip}>
        <IconButton size={buttonSize} color={buttonColor} onClick={onClick}>
          {icon}
        </IconButton>
      </Tooltip>
    </>
  );
};

export default React.memo(AppIconButton);
