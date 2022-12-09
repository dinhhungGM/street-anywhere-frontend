import { Box, Grid } from '@mui/material';
import { Gallery } from './components/gallery';

const LandingPage = () => {
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
