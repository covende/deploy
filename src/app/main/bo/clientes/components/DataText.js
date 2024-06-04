import React from 'react';
import { Text } from '@chakra-ui/react';

function DataText(props) {
  return (
    <Text
      color='#666666'
      fontFamily='Poppins'
      fontSize='12px'
      fontStyle='normal'
      fontWeight='400'
      lineHeight='18px'
      letterSpacing='0em'
      textAlign='left'
    >
      {props.children}
    </Text>
  );
}

export default DataText;
