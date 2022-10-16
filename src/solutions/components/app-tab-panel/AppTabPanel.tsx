import { Box } from '@mui/material';
import React from 'react';

interface IAppTabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const AppTabPanel = ({ children, index, value, ...others }: IAppTabPanelProps) => {
  return (
    <>
      <Box
        component='div'
        role='tabpanel'
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...others}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Box>
    </>
  );
};

export default AppTabPanel;
