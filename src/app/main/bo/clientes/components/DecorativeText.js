import React from 'react';
import { Text } from '@chakra-ui/react';

function DecorativeText(props) {
  return (
    <Text
      {...props}
      fontFamily='Poppins'
      fontSize='12px'
      fontStyle='normal'
      fontWeight='600'
      lineHeight='18px'
      letterSpacing='0em'
      textAlign='left'>
      {props.children}
    </Text>
  );
}

export default DecorativeText;
