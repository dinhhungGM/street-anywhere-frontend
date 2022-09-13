import { createTheme } from '@mui/material';

export const appTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 1024,
      md: 1440,
      lg: 1920,
      xl: 2048,
    },
  },
});
