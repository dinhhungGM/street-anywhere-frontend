import { Box, Grid } from '@mui/material';
import { Gallery } from './components/gallery';
import { useState, useCallback } from 'react';
import { WelcomeDashboard } from '../welcome-dashboard';

const LandingPage = () => {
  const [isWelcomePage, setIsWelcomePage] = useState<boolean>(true);

  const navigateToFeedsPage = useCallback(() => {
    setIsWelcomePage(false);
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#F5F5F7',
        }}>
        <Grid container>
          <Grid item xs={12}>
            <Gallery />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LandingPage;
