import { AddReaction, Bookmark, Comment, Delete, Edit, Map, Room, Visibility } from '@mui/icons-material';
import {
  Avatar,
  Box,
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
import ReactPlayer from 'react-player';
import { useNavigate } from 'react-router-dom';
import SweetAlert from 'sweetalert2';
import { useAppDispatch } from '../../../app/hooks';
import { AppCardCategories } from '../../../solutions/components/app-card-categories';
import { AppCardTags } from '../../../solutions/components/app-card-tags';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppInfoWidget } from '../../../solutions/components/app-info-widget';
import { AppListUserReact } from '../../../solutions/components/app-list-user-react';
import { AppMapBox } from '../../../solutions/components/app-mapbox';
import { AppModal } from '../../../solutions/components/app-modal';
import { AppMoreMenu } from '../../../solutions/components/app-more-menu';
import { AppUserComment } from '../../../solutions/components/app-user-comment';
import * as profileAsyncActions from './../profileDashboardAsyncActions';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
}: IMyPostProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpenMap, setIsOpenMap] = useState(false);
  const [isOpenReactionModal, setIsOpenReactionModal] = useState(false);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);

  const deletePost = async () => {
    SweetAlert.fire({
      icon: 'warning',
      title: 'Confirm',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: '#e60023',
      text: 'Are you sure to remove this post?',
    }).then((status) => {
      if (status.isConfirmed) {
        dispatch(profileAsyncActions.deletePostById(+postId));
      }
    });
  };

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
          width: '100%',
          position: 'relative',
          padding: '12px',
          marginBottom: '12px',
        }}
        component={Paper}>
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
            <Avatar />
            <Box>
              <Typography variant='h6' fontWeight={700}>
                {fullName}
              </Typography>
              <Typography fontSize={14}>{new Date(createdAt).toLocaleString()}</Typography>
            </Box>
          </Stack>
          <AppMoreMenu>
            <MenuItem>
              <ListItemIcon>
                <AppIcon icon={Edit} />
              </ListItemIcon>
              <ListItemText>Update</ListItemText>
            </MenuItem>
            <MenuItem onClick={deletePost}>
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
                      },
                    }}>
                    <LazyLoadImage alt={title} src={mediaUrl} effect='black-and-white' />
                  </Box>
                ) : (
                  <ReactPlayer
                    height='100%'
                    width='100%'
                    url={mediaUrl}
                    light
                    style={{
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
                <AppCardCategories categories={categories} />
                <Stack
                  direction='row'
                  spacing={2}
                  alignItems='center'
                  justifyContent='center'
                  width='100%'
                  marginTop='auto'>
                  <AppInfoWidget
                    value={reactionCount}
                    title='Reactions'
                    icon={AddReaction}
                    iconColor='#fbe44b'
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
        </Box>
      </Box>
      <AppModal title='Map' isOpen={isOpenMap} isDisplayCancelButton={false} onClose={hideMapModal} onOk={hideMapModal}>
        <AppMapBox desPoint={{ long: longitude, lat: latitude }} baseZoom={8.5} address={location} />
      </AppModal>
      <AppModal
        title='Reactions'
        isOpen={isOpenReactionModal}
        isDisplayCancelButton={false}
        onClose={hideReactionModal}
        onOk={hideReactionModal}>
        <AppListUserReact postId={postId} />
      </AppModal>
      <AppModal
        title='Comments'
        isOpen={isOpenCommentModal}
        isDisplayCancelButton={false}
        onClose={hideCommentModal}
        onOk={hideCommentModal}>
        <AppUserComment postId={postId} />
      </AppModal>
    </>
  );
};

export default React.memo(MyPost);
