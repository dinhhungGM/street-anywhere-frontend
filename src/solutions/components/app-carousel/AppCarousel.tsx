import { Box } from '@mui/material';
import { memo } from 'react';
import Slider from 'react-slick';

interface IAppCarouselProps {
  settings?: any;
  height?: string;
  width?: string;
  children?: any;
  customSettings?: any;
}
const AppCarousel = ({
  settings = {
    dots: true,
    speed: 300,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  },
  height,
  width,
  children,
  customSettings = {},
}: IAppCarouselProps) => {
  return (
    <>
      <Box
        sx={{
          height: height || '600px',
          width: width || '100%',
        }}>
        <Slider {...settings} {...customSettings}>
          {children}
        </Slider>
      </Box>
    </>
  );
};

export default memo(AppCarousel);
