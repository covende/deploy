import React from 'react';
import { Text } from '@chakra-ui/react';

function DataText2(props) {
  return (
    <Text
      color='#666666'
      fontFamily='Poppins'
      fontSize='11px'
      fontStyle='normal'
      fontWeight='400'
      lineHeight='17px'
      letterSpacing='0em'
      textAlign='left'
    >
      {props.children}
    </Text>
  );
}

export default DataText2;
