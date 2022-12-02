import { Box, Paper } from '@mui/material';
import { memo } from 'react';
import Slider from 'react-slick';
import Carouse1 from './../../assets/images/carousels/carousel1.jpg';
import Carouse2 from './../../assets/images/carousels/carousel2.jpg';
import Carouse3 from './../../assets/images/carousels/carousel3.jpg';
import Carouse4 from './../../assets/images/carousels/carousel4.jpg';
import Carouse5 from './../../assets/images/carousels/carousel5.jpg';
import Carouse6 from './../../assets/images/carousels/carousel6.jpg';

interface IAppCarouselProps {
  settings?: any;
  height?: string;
  width?: string;
}
const AppCarousel = ({
  settings = {
    dots: true,
    speed: 300,
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
          {[Carouse1, Carouse2, Carouse3, Carouse4, Carouse5, Carouse6].map((src, idx) => (
            <Box
              key={idx}
              sx={{
                height: height || '600px',
                '& img': {
                  width: '100%',
                  height: '100%',
                  borderRadius: 'initial',
                  objectFit: 'cover',
                  verticalAlign: 'center',
                },
              }}>
              <img src={src} alt='Carouse1' className='lazy' />
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default memo(AppCarousel);
