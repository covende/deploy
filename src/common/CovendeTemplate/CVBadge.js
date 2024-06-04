import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { CVText } from '.';
import { COLORS } from './CVThemes';
import { Badge } from '@material-ui/core';

/**
 *
 * @param {Object} param0
 * @param {React.ReactHTMLElement} param0.icon
 * @param {String} param0.text
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.color
 * @param {String} param0.fontSize
 *  @param {String} param0.textAlign
 * @param {String} param0.margin
 * @param {React.ReactHTMLElementr} param0.content
 * @returns
 */
function CVBadge({
  icon = '',
  text = '',
  color = 'blue',
  fontSize = '0.75rem',
  textAlign = '',
  margin= '',
  content = 0 
 
}) {
  return (
    <Box padding='1rem'>
      <Flex color={COLORS[color]} flexDirection='column' alignItems='center'>
        <Badge color='secondary' badgeContent={content}>
          {icon}
        </Badge>
        <CVText color={color} fontSize={fontSize} textAlign={textAlign} margin={margin}>
          {text}
        </CVText>
      </Flex>
    </Box>
  );
}

export default CVBadge;
