import { Box } from '@chakra-ui/layout';
import React from 'react';
import { COLORS } from '../CVThemes';
import SizeBox from '../../components/CustomComponent/SizeBox';

function CVSwitchOption({
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
    <Box onClick={() => onChange(!value)} display='flex'>
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        fontSize={fontSize}
        rounded={eval(intheight) * 0.25 + 'px'}
        minWidth={eval(intheight) * 1.5 + 'px'}
        height={height}
        border={'1px solid ' + (value ? COLORS[yesColor] : '#ACACAC')}
        backgroundColor={value ? COLORS[yesColor] : 'transparent'}
        color={value ? COLORS['white'] : COLORS['black']}
      >
        {yesText}
      </Box>
      <SizeBox />
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        fontSize={fontSize}
        rounded={eval(intheight) * 0.25 + 'px'}
        minWidth={eval(intheight) * 1.5 + 'px'}
        height={height}
        border={'1px solid ' + (!value ? COLORS[noColor] : '#ACACAC')}
        backgroundColor={!value ? COLORS[noColor] : 'transparent'}
        color={!value ? COLORS['white'] : COLORS['black']}
      >
        {noText}
      </Box>
    </Box>
  );
}

export default CVSwitchOption;
