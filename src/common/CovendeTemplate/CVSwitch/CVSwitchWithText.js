import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { COLORS } from '../CVThemes';

function CVSwitchWithText({
  value = false,
  onChange = (e) => {},
  height = '1.5rem',
  fontSize = '1rem',
  variant = 'simple' || 'withtext' || 'capsule' || 'option',
  yesText = 'SI',
  noText = 'NO',
  yesColor = 'green' ||
    'skyblue' ||
    'blue' ||
    'red' ||
    'yellow' ||
    'primary' ||
    'gray' ||
    'white' ||
    'black',
  noColor = 'red' ||
    'skyblue' ||
    'blue' ||
    'primary' ||
    'yellow' ||
    'green' ||
    'gray' ||
    'white' ||
    'black'
}) {
  var intheight = height.replace('px', '');
  return (
    <Flex alignItems='center'>
      <Box
        onClick={() => onChange(true)}
        id='yesText'
        height={height}
        width={height}
        display='flex'
        justifyContent='center'
        alignItems='center'
        fontSize={fontSize}
      >
        {yesText}
      </Box>
      <Box
        onClick={() => onChange(!value)}
        height={eval(intheight) * 0.9 + 'px'}
        width={eval(intheight) * 1.8 + 'px'}
        padding='1px'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        rounded={height}
        border='1px solid #ACACAC'
      >
        <Box
          backgroundColor={value ? COLORS[yesColor] : '#FFFFFF'}
          width={eval(intheight) * 0.7 + 'px'}
          height={eval(intheight) * 0.7 + 'px'}
          rounded={eval(intheight) * 0.7 + 'px'}
          display='block'
        />
        <Box
          backgroundColor={!value ? COLORS[noColor] : '#FFFFFF'}
          width={eval(intheight) * 0.7 + 'px'}
          height={eval(intheight) * 0.7 + 'px'}
          rounded={eval(intheight) * 0.7 + 'px'}
          display='block'
        />
      </Box>
      <Box
        fontSize={fontSize}
        height={height}
        width={height}
        display='flex'
        justifyContent='center'
        alignItems='center'
        onClick={() => onChange(false)}
      >
        {noText}
      </Box>
    </Flex>
  );
}

export default CVSwitchWithText;
