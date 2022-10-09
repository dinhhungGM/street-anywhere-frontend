import { Box } from '@mui/material';
// import Slider from 'react-slick';
import styles from './styles.module.scss';

const carouselImages = ['/carousel-1.jpg', '/carousel-2.jpg', '/carousel-3.jpg', '/carousel-4.jpg', '/carousel-5.jpg'];

const Carousel = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    easing: 'ease',
    lazyLoad: 'ondemand',
    fade: true,
  };
  return (
    <Box className={styles.container}>
      {/* <Slider {...settings} dots={true}>
        {carouselImages.map((imageUrl) => (
          <Box className={styles.carousel} key={imageUrl}>
            <img src={imageUrl} alt='Carousel' className='lazy' />
          </Box>
        ))}
      </Slider> */}
    </Box>
  );
};

export default Carousel;
