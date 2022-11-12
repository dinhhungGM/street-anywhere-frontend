import { AddReaction, Bookmark, Comment, Delete, Edit, Map, Room, Visibility } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Divider,
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
import React from 'react';
import { AppIcon } from '../../../solutions/components/app-icon';
import { AppInfoWidget } from '../../../solutions/components/app-info-widget';
import { AppMoreMenu } from '../../../solutions/components/app-more-menu';

const MyPost = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          padding: '12px',
          marginBottom: '12px',
        }}
        component={Paper}
      >
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={2}>
            <Avatar />
            <Box>
              <Typography variant='h6' fontWeight={700}>
                Nguyen Duc Hoa
              </Typography>
              <Typography fontSize={14}>{new Date().toLocaleString()}</Typography>
            </Box>
          </Stack>
          <AppMoreMenu>
            <MenuItem>
              <ListItemIcon>
                <AppIcon icon={Edit} />
              </ListItemIcon>
              <ListItemText>Update</ListItemText>
            </MenuItem>
            <MenuItem>
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
          }}
        >
          <Grid container spacing={2}>
            <Grid item sm={12} md={6}>
              <Stack justifyContent='center' alignItems='center' marginTop={2} height='100%'>
                <img
                  src='https://picsum.photos/200'
                  alt=''
                  style={{
                    maxHeight: '100%',
                  }}
                />
              </Stack>
            </Grid>
            <Grid item sm={12} md={6}>
              <Box marginTop={2}>
                <Typography>Description</Typography>
                <Stack direction='row' spacing={2} alignItems='center' justifyContent='flex-start'>
                  <AppIcon icon={Room} color='#e60023' />
                  <Typography>Location</Typography>
                  <Tooltip title='View on map' placement='top'>
                    <IconButton size='large' color='primary'>
                      <AppIcon icon={Map} color='#0288d1' />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Stack direction='row' spacing={2} alignItems='center' justifyContent='center'>
                  <AppInfoWidget
                    icon={AddReaction}
                    title='Reactions'
                    value={3}
                    iconColor='#fbe44b'
                    isInteractive={true}
                  />
                  <AppInfoWidget icon={Comment} title='Comments' value={3} isInteractive={true} />
                  <AppInfoWidget icon={Visibility} title='Views' value={3} iconColor='#eab171' />
                  <AppInfoWidget icon={Bookmark} title='Bookmarks' value={3} iconColor='#0288d1' />
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default React.memo(MyPost);
