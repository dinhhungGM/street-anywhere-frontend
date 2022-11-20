import { AddReaction, Bookmark, Comment, Visibility } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { AppIcon } from '../app-icon';
import { Icons } from '../icons';
import { AppCardCategories } from '../app-card-categories';
import { AppCardTags } from '../app-card-tags';
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
  isFullWidth?: boolean;
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
  isFullWidth = false,
}: AppCardProps) => {
  const navigate = useNavigate();

  const navigateToPostDetail = (): void => {
    navigate(`/posts/${postId}`);
  };

  return (
    <>
      <Box
        className={styles.card}
        onClick={navigateToPostDetail}
        sx={{
          width: isFullWidth ? '100%' : 'fit-content',
        }}
      >
        <Box className={styles['card__image']} borderRadius={4}>
          {type === 'video' ? (
            <ReactPlayer height='500px' width='100%' url={videoYtbUrl} className={styles['video']} light />
          ) : (
            <LazyLoadImage alt={alt} src={imgSrc} effect='black-and-white' />
          )}
        </Box>
        <Box className={styles['card__footer']}>
          <Stack direction='column'>
            <h2 className={styles['card__footer__caption']}>{shortTitle}</h2>
            <Typography justifyItems='center' justifyContent='flex-start' display='flex' marginY={1}>
              {Icons.Location}
              <span>{location}</span>
            </Typography>
            <AppCardCategories categories={categories} />
            <AppCardTags tags={tags} />
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
              {!isInProfilePage && (
                <Box className={styles['card__footer__reactions']}>
                  <AppIcon icon={Bookmark} />
                  <Typography>{bookmarkCount}</Typography>
                </Box>
              )}
            </Stack>
            <Typography marginTop={2} textAlign='right' fontStyle='italic'>
              <b>Created at</b>: {new Date(createdAt).toLocaleString()}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AppCard;
