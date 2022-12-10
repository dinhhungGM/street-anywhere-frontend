import { Bookmark, Favorite, PersonAdd, Visibility } from '@mui/icons-material';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  MenuItem,
  Paper,
  Typography,
} from '@mui/material';
import { memo } from 'react';
import ReactPlayer from 'react-player';
import { AppIcon } from '../app-icon';
import { AppIconButton } from '../app-icon-button';
import { AppMoreMenu } from '../app-more-menu';

interface IAppPostCardProps {
  avatarUrl?: string;
  fullName?: string;
  createdAt?: string;
  photoUrl?: string;
  videoUrl?: string;
  shortTitle?: string;
}
const AppPostCard = ({
  avatarUrl,
  fullName = 'Nguyen Duc Hoa',
  createdAt = new Date().toLocaleString(),
  photoUrl = 'https://picsum.photos/300',
  videoUrl,
  shortTitle = 'Short title sdjfasjdfklasdjfkljasdklfjasdklfjasdkljfklasdjfklsdjfklasdjfklklfjsklfasdl',
}: IAppPostCardProps) => {
  return (
    <>
      <Card sx={{ maxWidth: 345 }} component={Paper} elevation={2}>
        <CardHeader
          avatar={<Avatar src={avatarUrl} aria-label='recipe' alt={fullName} />}
          action={
            <AppMoreMenu>
              <MenuItem>
                <AppIcon icon={Visibility} />
                <Typography marginLeft={2}>View profile</Typography>
              </MenuItem>
              <MenuItem>
                <AppIcon icon={PersonAdd} />
                <Typography marginLeft={2}>Follow</Typography>
              </MenuItem>
            </AppMoreMenu>
          }
          title={fullName}
          subheader={createdAt}
        />
        {/* <CardMedia
          component='img'
          height='fit-content'
          image={photoUrl}
          alt='Paella dish'
          sx={{ borderRadius: 'unset' }}
        /> */}
        {/* <ReactPlayer light controls={false} url='https://www.youtube.com/watch?v=XtsuosHlriM' width='100%' /> */}

        <CardContent>
          <Typography variant='h6' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            {shortTitle}
          </Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ justifyContent: 'flex-end' }}>
          <AppIconButton
            ariaLabel='add to favorites'
            icon={<AppIcon icon={Favorite} />}
            tooltip='Add reaction+'
            buttonColor='error'
          />
          <AppIconButton
            ariaLabel='bookmark'
            icon={<AppIcon icon={Bookmark} />}
            tooltip='Bookmark'
            buttonColor='primary'
          />
        </CardActions>
      </Card>
    </>
  );
};

export default memo(AppPostCard);
