import { Search } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Box, ListItemButton, ListItemText, Paper, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { AppCard } from '../../solutions/components/app-card';
import { AppIcon } from '../../solutions/components/app-icon';
import { reactionsActions, reactionsSelectors } from './store';
import styles from './styles.module.scss';

const Reactions = () => {
  const dispatch = useAppDispatch();
  const reactions = useAppSelector(reactionsSelectors.selectReactionList);
  const posts = useAppSelector(reactionsSelectors.selectPostsByReaction);

  useEffect(() => {
    dispatch(reactionsActions.getReactionList());
    dispatch(reactionsActions.getPostsByReaction());
  }, []);
  return (
    <>
      <Box padding={4}>
        <Box component={Paper} elevation={2} borderRadius={10}>
          <Stack direction='row' alignItems='center' justifyContent='center'>
            {reactions?.map((reaction) => (
              <ListItemButton key={reaction.id} className={styles.reaction}>
                <ListItemText>{reaction.reactionType}</ListItemText>
              </ListItemButton>
            ))}
          </Stack>
        </Box>
        <Box padding={4}>
          {posts?.length ? (
            <Masonry columns={{ sm: 1, md: 3, lg: 4, xl: 5 }} spacing={2}>
              {posts &&
                posts.map((post) => (
                  <Box
                    sx={{
                      margin: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    key={post?.id}
                  >
                    <AppCard
                      imgSrc={post?.imageUrl}
                      alt={post?.shortTitle}
                      author={post?.user.fullName}
                      avatarUrl={post?.user.profilePhotoUrl}
                      tags={post?.tags}
                      categories={post?.categories}
                      shortTitle={post?.shortTitle}
                      location={post?.location}
                      postId={post?.id}
                      type={post?.type}
                      videoYtbUrl={post?.videoYtbUrl}
                      views={post?.views}
                      reactionCount={post?.reactionCount}
                      bookmarkCount={post?.bookmarkCount}
                      commentCount={post?.commentCount}
                      createdAt={post?.createdAt}
                    />
                  </Box>
                ))}
            </Masonry>
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
              }}
            >
              <AppIcon icon={Search} fontSize={120} />
              <Typography variant='h6' marginY={4}>
                No data found
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default React.memo(Reactions);
