import React from 'react';
import { Text as TextChakra } from '@chakra-ui/react';

function Text({ children, ...rest }) {
  return <TextChakra {...rest}>{children}</TextChakra>;
}

export default Text;
