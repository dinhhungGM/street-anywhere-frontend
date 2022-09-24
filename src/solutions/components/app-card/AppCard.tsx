import { Category, Room, Tag } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../app-icon';
import styles from './styles.module.scss';
import { LazyLoadImage } from 'react-lazy-load-image-component';

type AppCardProps = {
  imgSrc: string;
  alt: string;
  author?: string;
  shortTitle?: string;
  tags?: string[];
  categories?: string[];
  avatarUrl?: string;
  postId?: number;
  location?: string;
  type?: string;
  videoYtbUrl?: string;
};

const AppCard = ({
  imgSrc,
  alt,
  author,
  shortTitle,
  avatarUrl,
  postId,
  location,
  type,
  videoYtbUrl,
  tags,
  categories,
}: AppCardProps) => {
  const navigate = useNavigate();

  const navigateToPostDetail = (): void => {
    navigate(`/posts/${postId}`);
  };

  return (
    <>
      <Box className={styles.card} onClick={navigateToPostDetail}>
        <Box className={styles['card__image']} borderRadius={4}>
          {type === 'video' ? (
            <ReactPlayer height='500px' width='100%' url={videoYtbUrl} className={styles['video']} light />
          ) : (
            <LazyLoadImage alt={alt} src={imgSrc} effect='black-and-white' />
          )}
        </Box>
        <Box className={styles['card__footer']}>
          <Stack direction='column'>
            <h3 className={styles['card__footer__caption']}>{shortTitle}</h3>
            <Typography justifyItems='center' justifyContent='flex-start' display='flex' marginY={1}>
              <AppIcon component={Room} color='#e60023' />
              <span>{location}</span>
            </Typography>
            <Box className={styles['card__footer__tags']}>
              <Stack direction='row' spacing={1} flexWrap='wrap' marginY={1}>
                <Typography fontWeight={700}>Tags: </Typography>
                {tags.map((tag) => (
                  <>
                    <Typography key={tag} display='flex'>
                      <AppIcon component={Tag} />
                      <span style={{ marginLeft: '4px' }}>{tag}</span>
                    </Typography>
                  </>
                ))}
              </Stack>
            </Box>
            <Box className={styles['card__footer__tags']}>
              <Stack direction='row' spacing={2} flexWrap='wrap' marginY={1}>
                <Typography fontWeight={700}>Categories: </Typography>
                {categories.map((category, idx) => (
                  <>
                    <Typography key={idx} display='flex'>
                      <AppIcon component={Category} />
                      <span style={{ marginLeft: '4px' }}>{category}</span>
                    </Typography>
                  </>
                ))}
              </Stack>
            </Box>
            <Box className={styles['card__footer__avatar']}>
              <img src={avatarUrl} alt='Avatar' />
              <Typography>{author}</Typography>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AppCard;
