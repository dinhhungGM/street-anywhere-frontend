import { AddReaction, Bookmark, Comment, Visibility } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../app-icon';
import { Icons } from '../icons';
import styles from './styles.module.scss';

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
  isInProfilePage?: boolean;
  views?: number;
  reactionCount?: number;
  bookmarkCount?: number;
  commentCount?: number;
  createdAt?: string;
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
  isInProfilePage,
  views,
  reactionCount,
  bookmarkCount,
  commentCount,
  createdAt,
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
              {Icons.Location}
              <span>{location}</span>
            </Typography>
            {!isInProfilePage && (
              <Box className={styles['card__footer__avatar']}>
                <img src={avatarUrl} alt='Avatar' />
                <Typography>{author}</Typography>
              </Box>
            )}
            <Stack flexDirection='row' alignItems='center' justifyContent='flex-end' marginTop={2}>
              <Box className={styles['card__footer__views']}>
                <AppIcon icon={Visibility} />
                <Typography>{views}</Typography>
              </Box>
              <Box className={styles['card__footer__reactions']}>
                <AppIcon icon={AddReaction} />
                <Typography>{reactionCount}</Typography>
              </Box>
              <Box className={styles['card__footer__reactions']}>
                <AppIcon icon={Comment} />
                <Typography>{commentCount}</Typography>
              </Box>
              <Box className={styles['card__footer__reactions']}>
                <AppIcon icon={Bookmark} />
                <Typography>{bookmarkCount}</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AppCard;
