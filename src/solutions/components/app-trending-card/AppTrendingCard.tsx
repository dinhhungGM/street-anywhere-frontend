import { Shortcut, Visibility } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';
import { memo } from 'react';
import ReactPlayer from 'react-player';
import { AppIcon } from '../app-icon';
import LikeSrc from './../../assets/images/reactions/like.png';
import LoveSrc from './../../assets/images/reactions/love.png';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import { IBookmarkDetail } from '../../models/postModels';

interface IAppTrendingCardProps {
  type?: string;
  title?: string;
  views?: number;
  userId?: number;
  postId?: number;
  fullName?: string;
  imageUrl?: string;
  createdAt?: string;
  videoYtbUrl?: string;
  totalReaction?: number;
  profilePhotoUrl?: string;
  isBookmarked?: boolean;
  bookmarkDetail?: any;
}
const AppTrendingCard = ({
  fullName,
  type,
  title,
  views,
  userId,
  postId,
  imageUrl,
  createdAt,
  videoYtbUrl,
  totalReaction,
  profilePhotoUrl,
}: IAppTrendingCardProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar src={profilePhotoUrl}>{fullName[0]}</Avatar>}
          title={fullName}
          subheader={createdAt}
          onClick={() => navigate(`/profile/${ userId }`)}
          sx={{ cursor: 'pointer' }}
        />
        {type === 'video' ? (
          <>
            <Box marginY={1}>
              <ReactPlayer url={videoYtbUrl} light controls={false} muted width='100%' />
            </Box>
          </>
        ) : (
          <>
            <CardMedia component='img' height='300' image={imageUrl} alt='Image' sx={{ px: 1 }} />
          </>
        )}
        <CardContent>
          <Typography variant='h6' className={styles.title}>
            {title}
          </Typography>
          <Box marginY={1}>
            <Stack direction='row'>
              <Stack direction='row' width='50%' spacing={2} alignItems='center'>
                <AppIcon icon={Visibility} />
                <Typography fontWeight={600}>{views} views</Typography>
              </Stack>
              <Stack direction='row' width='50%' spacing={2} alignItems='center'>
                <Stack direction='row' spacing={1}>
                  <Avatar src={LikeSrc} sx={{ width: 24, height: 24 }} />
                  <Avatar src={LoveSrc} sx={{ width: 24, height: 24 }} />
                </Stack>
                <Typography fontWeight={600}>{totalReaction}</Typography>
              </Stack>
            </Stack>
          </Box>
          <Stack direction='row' alignItems='center' justifyContent='space-between' marginTop={2}>
            <Button
              startIcon={<AppIcon icon={Shortcut} color='#fff' />}
              variant='contained'
              color='success'
              onClick={() => navigate(`/posts/${ postId }`)}>
              View more
            </Button>
            <Button
              startIcon={<AppIcon icon={Shortcut} color='#fff' />}
              variant='contained'
              color='success'
              onClick={() => navigate(`/posts/${ postId }`)}>
              View more
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default memo(AppTrendingCard);
