import { Flex } from '@chakra-ui/layout';
import React from 'react';

/**
 *
 * @param {Object} param0
 * @param {Object} param0.style
 * @param {String} param0.width
 * @param {String} param0.height
 * @param {('start' | 'end' | 'space-around' | 'space-between' | 'center')} param0.justifyContent
 * @param {('start' | 'center' | 'stretch' | 'end')} param0.alignItems
 * @param {('auto' | 'hidden')} param0.overflow
 * @param {('wrap' | 'nowrap')} param0.wrap
 * @param {Function} param0.onClick
 * @param {Function} param0.onHover
 * @returns
 */
function CVColumn({
  style = {},
  width = '100%',
  height = '100%',
  children,
  justifyContent = 'start' ||
    'end' ||
    'space-around' ||
    'space-between' ||
    'center',
  alignItems = 'start' || 'center' || 'stretch' || 'end',
  overflow = 'auto' || 'hidden',
  wrap = 'wrap' || 'nowrap',
  onClick = () => {},
  onHover = () => {}
}) {
  return (
    <Flex
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={() => onClick()}
      style={style}
      width={width}
      height={height}
      flexDirection='column'
      justifyContent={justifyContent}
      alignItems={alignItems}
      overflow={overflow}
      wrap={wrap}>
      {children}
    </Flex>
  );
}

export default CVColumn;
