import { Box, Button, Container, Stack, Typography } from '@mui/material';
import React from 'react';

const Carousel = () => {
  return (
    <>
      <Container>
        <Box paddingY={8}>
          <Typography textAlign='center' fontSize={48} fontWeight={700}>
            See it, make it, try it, do it
          </Typography>
          <Typography textAlign='center' marginTop={2} fontSize={16}>
            The best part of the website is discovering new things and ideas from people around the world
          </Typography>
          <Stack justifyContent='center' alignItems='center' marginTop={3}>
            <Button variant='contained' size='large'>Share now!</Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
};

export default Carousel;
