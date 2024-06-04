import { Box } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import React, { Suspense } from 'react';
import { SuspenseImg } from './CVImageCache';

function CVImageAvatar({ image, style, name }) {
  return (
    <Suspense
      fallback={
        <Box style={style}>
          <Skeleton style={style} />
        </Box>
      }>
      <SuspenseImg alt={name} style={style} src={image} variant='avatar' />
    </Suspense>
  );
}

export default CVImageAvatar;
