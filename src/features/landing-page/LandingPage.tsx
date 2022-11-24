import { Box, Grid } from '@mui/material';
import { Carousel } from './components/carousel';
import { Gallery } from './components/gallery';

const LandingPage = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#F5F5F7',
          paddingY: '20px',
        }}>
        <Box paddingX={6} paddingBottom={4}>
          <Carousel />
        </Box>
        <Grid container>
          <Grid item xs={12} paddingX={2}>
            <Gallery />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LandingPage;
