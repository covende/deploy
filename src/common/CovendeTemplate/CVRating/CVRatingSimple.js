import { Box } from '@chakra-ui/layout';
import React from 'react';
import { AiFillStar } from 'react-icons/ai';

function CVRatingSimple({ puntuation = '5.0', color = '#ff5454' }) {
  return (
    <Box
      display='flex'
      alignItems='center'
      border='1px solid #C4C4C475'
      rounded='1rem'
      padding='1px 5px'
      fontFamily='Roboto'
      fontWeight='bold'>
      <span>{puntuation}</span> <AiFillStar style={{ color }} />
    </Box>
  );
}

export default CVRatingSimple;
