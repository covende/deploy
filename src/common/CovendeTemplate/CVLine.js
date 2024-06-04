import { Box } from '@chakra-ui/layout';
import React from 'react';
import { v4 } from 'uuid';
import { COLORS } from './CVThemes';

/**
 *
 * @param {Object} param0
 * @param {('primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'white' | 'black' | 'lightGray')} param0.color
 * @param {('primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'white' | 'black' | 'lightGray')} param0.backgroundColor
 * @param {[any]} param0.titles
 * @param {('center' | 'start' | 'end')} param0.linePosition
 * @param {String} param0.lineHeight
 * @param {String} param0.fontSize
 * @param {String} param0.maxWidth
 * @param {String} param0.height
 *  @param {String} param0.colortext
 * @returns
 */
function CVLine({
  colortext='',
  color = 'primary' ||
    'skyblue' ||
    'blue' ||
    'red' ||
    'yellow' ||
    'green' ||
    'gray' ||
    'white' ||
    'black' ||
    'lightGray',
  backgroundColor = 'lightGray' ||
    'skyblue' ||
    'blue' ||
    'red' ||
    'yellow' ||
    'green' ||
    'gray' ||
    'primary' ||
    'black' ||
    'white',
  titles = [],
  fontSize = '1.5rem',
  linePosition = 'center' || 'start' || 'end',
  lineHeight = '0.3rem',
  maxWidth = '100%',
  height = '3rem'
}) {
  return (
    <Box position='relative' width='100%' maxWidth={maxWidth}>
      <Box
        height={height}
        display='flex'
        width='100%'
        alignItems={linePosition}>
        <Box
          rounded='1rem'
          width='100%'
          height={lineHeight}
          backgroundColor={COLORS[color] || color}></Box>
      </Box>
      <Box
        top='0'
        width='100%'
        position='absolute'
        height={height}
        display='flex'
        alignItems='center'
        justifyContent='space-between'>
        {titles.map((item) => (
          <Box
            key={v4()}
            fontSize={fontSize}
            fontWeight='bold'
            padding='0 1rem'
            color={colortext || COLORS[color]}
            backgroundColor={COLORS[backgroundColor] || 'backgroundColor'}>
            {item}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default CVLine;
