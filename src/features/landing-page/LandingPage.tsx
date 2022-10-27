import { Box, Grid } from '@mui/material';
import { Carousel } from './components/carousel';
import { Categories } from './components/categories';
import { Gallery } from './components/gallery';
import { TagClouds } from './components/tag-clouds';
import { TopVideos } from './components/top-videos';

const LandingPage = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#F5F5F7',
          paddingY: '20px',
        }}
      >
        {/* <Carousel /> */}
        <Grid container>
          <Grid item xs={8} paddingX={2}>
            <Gallery />
          </Grid>
          <Grid item xs={4} paddingX={4}>
            <TagClouds />
            <br />
            <TopVideos />
            <br />
            <Categories />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LandingPage;
