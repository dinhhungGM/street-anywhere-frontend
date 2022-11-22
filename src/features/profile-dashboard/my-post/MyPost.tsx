import { AddReaction, Bookmark, Comment, Delete, Edit, Map, Room, Shortcut, Visibility } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import _ from 'lodash';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import { AppCardCategories } from '../../../solutions/components/app-card-categories';
import { AppCardTags } from '../../../solutions/components/app-card-tags';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppInfoWidget } from '../../../solutions/components/app-info-widget';
import { AppListUserReact } from '../../../solutions/components/app-list-user-react';
import { AppMapBox } from '../../../solutions/components/app-mapbox';
import { AppModal } from '../../../solutions/components/app-modal';
import { AppMoreMenu } from '../../../solutions/components/app-more-menu';
import { AppUserComment } from '../../../solutions/components/app-user-comment';

interface IMyPostProps {
  tags?: string[];
  title?: string;
  postId?: number;
  mediaUrl?: string;
  fullName?: string;
  latitude?: number;
  location?: string;
  viewCount?: number;
  longitude?: number;
  createdAt?: string;
  shortTitle?: string;
  description?: string;
  typeOfMedia?: string;
  categories?: string[];
  commentCount?: number;
  reactionCount?: number;
  bookmarkCount?: number;
  avatarUrl?: string;
  onDeletePost?: () => any;
  onUpdatePost?: () => any;
}
const MyPost = ({
  tags,
  title,
  postId,
  fullName,
  mediaUrl,
  latitude,
  location,
  viewCount,
  longitude,
  createdAt,
  categories,
  shortTitle,
  description,
  typeOfMedia,
  commentCount,
  reactionCount,
  bookmarkCount,
  avatarUrl,
  onDeletePost = () => null,
  onUpdatePost = () => null,
}: IMyPostProps) => {
  const navigate = useNavigate();
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [isOpenReactionModal, setIsOpenReactionModal] = useState(false);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);

  const showMapModal = (): void => {
    setIsOpenMap(true);
  };

  const hideMapModal = (): void => {
    setIsOpenMap(false);
  };

  const showReactionModal = (): void => {
    setIsOpenReactionModal(true);
  };

  const hideReactionModal = (): void => {
    setIsOpenReactionModal(false);
  };

  const showCommentModal = (): void => {
    setIsOpenCommentModal(true);
  };

  const hideCommentModal = (): void => {
    setIsOpenCommentModal(false);
  };

  const navigateToPostDetail = (e): void => {
    e.stopPropagation();
    navigate(`/posts/${ postId }`);
  };

  return (
    <>
      <Box
        sx={{
          padding: '12px',
          width: '100%',
          marginBottom: '12px',
          position: 'relative',
        }}
        component={Paper}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
            <Avatar src={avatarUrl} />
            <Box>
              <Typography variant='h6' fontWeight={700}>
                {fullName}
              </Typography>
              <Typography fontSize={14}>{new Date(createdAt).toLocaleString()}</Typography>
            </Box>
          </Stack>
          <AppMoreMenu>
            <MenuItem onClick={onUpdatePost}>
              <ListItemIcon>
                <AppIcon icon={Edit} />
              </ListItemIcon>
              <ListItemText>Update</ListItemText>
            </MenuItem>
            <MenuItem onClick={onDeletePost}>
              <ListItemIcon>
                <AppIcon icon={Delete} />
              </ListItemIcon>
              <ListItemText>Delete</ListItemText>
            </MenuItem>
          </AppMoreMenu>
        </Stack>
        <Box
          sx={{
            height: '100%',
          }}>
          <Grid container spacing={3}>
            <Grid item sm={12} md={5}>
              <Stack justifyContent='center' alignItems='center' marginTop={2} height='100%' paddingY={2}>
                {typeOfMedia.includes('image') ? (
                  <Box
                    sx={{
                      '& img': {
                        maxWidth: '100%',
                        maxHeight: '100%',
                        transition: 'all .3s ease',
                        '&:hover': {
                          transform: 'scale(2)',
                        },
                      },
                    }}>
                    <LazyLoadImage alt={title} src={mediaUrl} effect='black-and-white' />
                  </Box>
                ) : (
                  <ReactPlayer
                    light
                    width='100%'
                    url={mediaUrl}
                    style={{
                      minHeight: '300px',
                      maxHeight: '800px',
                    }}
                  />
                )}
              </Stack>
            </Grid>
            <Grid item sm={12} md={7}>
              <Box marginTop={2} height='100%'>
                <Typography variant='h4'>{shortTitle}</Typography>
                {_.isNil(description) && <Typography textAlign='justify'>{description}</Typography>}
                <Stack direction='row' spacing={2} alignItems='center' justifyContent='flex-start' marginBottom={1}>
                  <AppIcon icon={Room} color='#e60023' />
                  <Typography
                    sx={{
                      width: '90%',
                    }}>
                    {location}
                  </Typography>
                  <Tooltip title='View on map' placement='top'>
                    <IconButton size='large' color='primary' onClick={showMapModal}>
                      <AppIcon icon={Map} color='#0288d1' />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <AppCardTags tags={tags} />
                <Box marginY={1}>
                  <AppCardCategories categories={categories} />
                </Box>
                <Stack
                  spacing={1}
                  width='100%'
                  direction='row'
                  marginTop='auto'
                  alignItems='center'
                  justifyContent='center'>
                  <AppInfoWidget
                    title='Reactions'
                    icon={AddReaction}
                    iconColor='#fbe44b'
                    value={reactionCount}
                    isInteractive={reactionCount !== 0}
                    onClick={reactionCount !== 0 ? showReactionModal : null}
                  />
                  <AppInfoWidget
                    icon={Comment}
                    title='Comments'
                    value={commentCount}
                    isInteractive={commentCount !== 0}
                    onClick={commentCount !== 0 ? showCommentModal : null}
                  />
                  <AppInfoWidget icon={Visibility} title='Views' value={viewCount} iconColor='#eab171' />
                  <AppInfoWidget icon={Bookmark} title='Bookmarks' value={bookmarkCount} iconColor='#0288d1' />
                </Stack>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign='right' marginTop={2}>
            <Button
              variant='contained'
              color='primary'
              startIcon={<AppIcon icon={Shortcut} color='#fff' />}
              onClick={navigateToPostDetail}>
              View more
            </Button>
          </Box>
        </Box>
      </Box>
      <AppModal title='Map' isOpen={isOpenMap} isDisplayCancelButton={false} onClose={hideMapModal} onOk={hideMapModal}>
        <AppMapBox desPoint={{ long: longitude, lat: latitude }} baseZoom={8.5} address={location} />
      </AppModal>
      <AppModal
        title='Reactions'
        onOk={hideReactionModal}
        onClose={hideReactionModal}
        isOpen={isOpenReactionModal}
        isDisplayCancelButton={false}>
        <AppListUserReact postId={postId} />
      </AppModal>
      <AppModal
        onOk={hideCommentModal}
        onClose={hideCommentModal}
        isOpen={isOpenCommentModal}
        isDisplayCancelButton={false}
        title={`Comments(${ commentCount })`}>
        <AppUserComment postId={postId} />
      </AppModal>
    </>
  );
};

export default React.memo(MyPost);
