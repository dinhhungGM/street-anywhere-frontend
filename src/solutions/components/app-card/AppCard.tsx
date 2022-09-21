import { Room } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../app-icon';
import styles from './styles.module.scss';

type AppCardProps = {
  imgSrc: string;
  alt: string;
  author?: string;
  shortTitle?: string;
  tags?: string[];
  avatarUrl?: string;
  postId?: number;
  location?: string;
};

const AppCard = ({ imgSrc, alt, author, shortTitle, avatarUrl, postId, location }: AppCardProps) => {
  const navigate = useNavigate();

  const navigateToPostDetail = (): void => {
    navigate(`/posts/${postId}`);
  };

  return (
    <>
      <Box className={styles.card} onClick={navigateToPostDetail}>
        <Box className={styles['card__image']} boxShadow={1} borderRadius={4}>
          <img src={imgSrc} alt={alt} loading='lazy' />
        </Box>
        <Box className={styles['card__footer']}>
          <Stack direction='column'>
            <h3 className={styles['card__footer__caption']}>{shortTitle}</h3>
            <Typography justifyItems='center' justifyContent='flex-start' display='flex' marginY={1}>
              <AppIcon component={Room} color='#e60023' />
              <span>{location}</span>
            </Typography>
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
