import { Box, Chip, Stack, Typography } from '@mui/material';

const TagClouds = () => {
  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          borderRadius: '16px',
          padding: '12px',
        }}
      >
        <Typography variant='h5'>Tag Clouds</Typography>
        <Stack
          direction='row'
          flexWrap='wrap'
          justifyContent='flex-start'
          alignItems='center'
          gap={1}
          alignContent='flex-start'
          marginTop={3}
        >
          {tags.map((tag, idx) => (
            <Chip label={tag} key={idx} variant='outlined' />
          ))}
        </Stack>
      </Box>
    </>
  );
};

const tags = [
  'video',
  'music',
  'art',
  'vimeo',
  'instagram',
  'design',
  'list',
  'poll',
  'playlist',
  'mp4',
  'news',
  'wallpaper',
  'image',
  'king',
  'nature',
  'flower',
  'multiple',
];

export default TagClouds;
