import { Box, Paper } from '@mui/material';
import { memo } from 'react';
import Slider from 'react-slick';

interface IAppCarouselProps {
  settings?: any;
  height?: string;
  width?: string;
}
const AppCarousel = ({
  settings = {
    dots: true,
    fade: true,
    speed: 500,
    lazyLoad: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  },
  height,
  width,
}: IAppCarouselProps) => {
  return (
    <>
      <Box
        sx={{
          height: height || '600px',
          width: width || '100%',
        }}
        component={Paper}>
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </Box>
    </>
  );
};

export default memo(AppCarousel);
