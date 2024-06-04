import { Box } from '@chakra-ui/layout';
import React from 'react';
import { COLORS } from '../CVThemes';

function CVSwitchCapsule({
  value = false,
  onChange = (e) => {},
  height = '1.5rem',
  fontSize = '1rem',
  variant = 'simple' || 'withtext' || 'capsule' || 'option',
  yesText = 'SI',
  noText = 'NO',
  yesColor = 'primary' ||
    'skyblue' ||
    'blue' ||
    'red' ||
    'yellow' ||
    'green' ||
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
    <Box
      onClick={() => onChange(!value)}
      display='flex'
      rounded={height}
      border={`1px solid ${COLORS[value ? yesColor : noColor]}`}
    >
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        fontSize={fontSize}
        borderLeftRadius={height}
        minWidth={eval(intheight) * 1.5 + 'px'}
        height={height}
        backgroundColor={value ? COLORS[yesColor] : 'transparent'}
        color={value ? COLORS['white'] : COLORS['black']}
      >
        {yesText}
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        fontSize={fontSize}
        borderRightRadius={height}
        minWidth={eval(intheight) * 1.5 + 'px'}
        height={height}
        backgroundColor={!value ? COLORS[noColor] : 'transparent'}
        color={!value ? COLORS['white'] : COLORS['black']}
      >
        {noText}
      </Box>
    </Box>
  );
}

export default CVSwitchCapsule;
