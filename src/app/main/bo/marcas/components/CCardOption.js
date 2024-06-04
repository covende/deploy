import React from 'react';
import { Box } from '@chakra-ui/layout';

/**
 *
 * @param {Object} param0
 * @param {String} param0.borderColor
 * @param {String} param0.backgroundColor
 * @param {String} param0.color
 * @param {String} param0.name
 * @param {String} param0.text
 * @returns
 */
function CCardOption({
  borderColor = '',
  backgroundColor = '',
  color = '#FFFFFF',
  text = ''
}) {
  return (
    <Box
      display='flex'
      justifyContent='center'
      alignItems='center'
      fontSize='1rem'
      rounded='4.5px'
      minWidth='27px'
      height='18px'
      border={'1px solid ' + borderColor}
      backgroundColor={backgroundColor}
      color={color}>
      {text}
    </Box>
  );
}

export default CCardOption;
