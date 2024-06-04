import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { COLORS } from './CVThemes';

const BackgroundClip = () => (
  <Box
    position='absolute'
    bottom='0px'
    left='0px'
    width='100%'
    height='90%'
    maxHeight='150px'
    clipPath='polygon(0 54%, 13% 58%, 25% 38%, 43% 45%, 56% 19%, 75% 30%, 90% 0, 100% 20%, 100% 100%, 0 100%)'
    backgroundColor='#F9F9F930'></Box>
);

/**
 *
 * @param {Object} param0
 * @param {Object} param0.borderRadius
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.backgroundColor
 * @param {String} param0.width
 * @param {String} param0.height
 * @param {String} param0.padding
 * @param {String} param0.border
 * @param {('row' | 'column')} param0.itemDirection
 * @param {('start' | 'end' | 'space-around' | 'space-between' | 'center')} param0.itemJustify
 * @param {('start' | 'center' | 'stretch' | 'end')} param0.itemsAlign
 * @param {Function} param0.onHover
 * @param {Function} param0.onClick
 * @param {Object} param0.style
 * @param {React.ElementType} param0.backgroundClip
 * @param {Boolean} param0.useBackgroundClip
 * @param {String} param0.margin
 * @param {('flex' | 'box')} param0.variant
 * @returns
 */
function CVPanel({
  borderRadius = '1rem',
  backgroundColor = 'white' ||
    'primary' ||
    'skyblue' ||
    'blue' ||
    'red' ||
    'yellow' ||
    'green' ||
    'gray' ||
    'black',
  width = '100%',
  height = '90%',
  border = 'none',
  padding = '1rem',
  itemDirection = 'row' || 'column',
  itemJustify = 'start' ||
    'end' ||
    'space-around' ||
    'space-between' ||
    'center',
  itemsAlign = 'start' || 'center' || 'stretch' || 'end',
  children,
  onHover = () => {},
  onClick = () => {},
  style = {},
  useBackgroundClip = false,
  backgroundClip = <BackgroundClip />,
  margin = '0pox',
  variant = 'flex'
}) {
  const variations = {
    flex: (
      <Flex
        margin={margin}
        position='relative'
        style={style}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={() => onClick()}
        borderRadius={borderRadius}
        backgroundColor={COLORS[backgroundColor] || COLORS['white']}
        justifyContent={itemJustify}
        alignItems={itemsAlign}
        flexDirection={itemDirection}
        width={width}
        height={height}
        border={border}
        padding={padding}>
        {useBackgroundClip ? backgroundClip : ''}
        {children}
      </Flex>
    ),
    box: (
      <Box
        margin={margin}
        position='relative'
        style={style}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={() => onHover(false)}
        onClick={() => onClick()}
        borderRadius={borderRadius}
        backgroundColor={COLORS[backgroundColor] || COLORS['white']}
        width={width}
        height={height}
        padding={padding}>
        {useBackgroundClip ? backgroundClip : ''} {children}
      </Box>
    )
  };
  return variations[variant];
}

export default CVPanel;
