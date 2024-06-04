import React from 'react';
import { Heading } from '@chakra-ui/react';

function DecorativeHeading(props) {
  return (
    <Heading
      color='#004574'
      fontFamily='"Poppins"'
      lineHeight='18px'
      fontSize='13px'
      mb='8px'
    >
      {props.children}
    </Heading>
  );
}

export default DecorativeHeading;
