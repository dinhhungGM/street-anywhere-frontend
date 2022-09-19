import { KeyboardArrowUp, Room, Share } from '@mui/icons-material';
import { Box, Chip, IconButton, Stack, Tooltip, Typography } from '@mui/material';
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

const AppCard = ({ imgSrc, alt, author, shortTitle, tags, postId, location }: AppCardProps) => {
  const navigate = useNavigate();

  const navigateToPostDetail = (): void => {
    navigate(`/posts/${ postId }`);
  };

  return (
    <>
      <Box className={styles.card} onClick={navigateToPostDetail}>
        <Box className={styles['card__actions']}>
          <Tooltip title='Quick view' placement='right-end'>
            <IconButton className={styles['card__actions__btn']}>
              <AppIcon component={KeyboardArrowUp} />
            </IconButton>
          </Tooltip>
          <Tooltip title='Share' placement='right-end'>
            <IconButton className={styles['card__actions__btn']}>
              <AppIcon component={Share} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box className={styles['card__image']} boxShadow={1} borderRadius={4}>
          <img src={imgSrc} alt={alt} loading='lazy' />
          <Box className={styles['card__image__tags']}>
            <Stack spacing={2} direction='row'>
              {tags?.map((tag, idx) => (
                <Chip key={idx} label={tag} className={styles['card__image__tags__item']} />
              ))}
            </Stack>
          </Box>
        </Box>
        <Box className={styles['card__footer']}>
          <Stack direction='column'>
            <h3 className={styles['card__footer__caption']}>{shortTitle}</h3>
            <Typography justifyItems='center' justifyContent='flex-start' display='flex' marginY={1}>
              <AppIcon component={Room} color='#e60023' />
              <span>{location}</span>
            </Typography>
            <Box className={styles['card__footer__avatar']}>
              <img src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' alt='Avatar' />
              <span>{author}</span>
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AppCard;
