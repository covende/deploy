import { Box, Text } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import React from 'react';
import { COLORS, FONTSIZE, FONTSIZE_DEFAULT } from './CVThemes';

/**
 *
 * @param {Object} param0
 * @param {String} param0.fontSize
 * @param {String} param0.fontSizeResponsive
 * @param {('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black')} param0.color
 * @param {String} param0.className
 * @param {('hairline'|'thin'|'light'|'normal'|'medium'|'semibold'|'bold'|'extrabold'|'black')} param0.fontWeight
 * @param {('none' | 'line-through')} param0.textDecoration
 * @param {('start' | 'center' | 'end')} param0.textAlign
 * @param {('inherit' | 'initial' | 'capitalize' | 'lowercase' | 'uppercase')} param0.textTransform
 * @param {('normal' | 'maxtext')} param0.variant
 * @param {Number} param0.lineHeight
 * @param {Number} param0.lines
 * @param {('inherit' | 'flex')} param0.display
 * @param {('Poppins' | 'Roboto')} param0.fontFamily
 * @param {('normal' | 'italic'|'oblique')} param0.fontStyle
 * @returns
 */
function CVText({
  children,
  fontSize = '1rem',
  fontSizeResponsive = '1rem',
  color = 'black',
  className = '',
  fontWeight = 'normal',
  textAlign = 'start',
  textTransform = 'inherit',
  variant = 'normal' || 'maxtext',
  lineHeight = 1.4,
  lines = 1,
  textDecoration = 'none' || 'line-through',
  display = 'inherit',
  fontFamily = 'Poppins',
  fontStyle = 'normal',
  overflow,
  marginRight = '0',
  marginLeft = '0',
  transition = 'none',
  transform = 'none',
  borderBottom = 'none',
  justifyContent = 'normal'
}) {
  const MaxText = styled.div`
    display: -webkit-box;
    -webkit-line-clamp: ${({ lines }) => lines};
    -webkit-box-orient: vertical;
    overflow: ${({ overflow }) => (overflow ? overflow : 'hidden')};
    height: ${({ height }) => height};
    font-size: ${({ fontSize }) => fontSize};
    line-height: ${({ lineHeight }) => lineHeight};
    text-transform: ${({ textTransform }) => textTransform};
    color: ${({ color }) => color};
    text-align: ${({ textAlign }) => textAlign};
    font-weight: ${({ fontWeight }) => fontWeight};
    text-decoration: ${({ textDecoration }) => textDecoration};
    font-family: ${({ fontFamily }) => fontFamily};
    font-style: ${({ fontStyle }) => fontStyle};
    transition: ${({ transition }) => transition};
    transform: ${({ transform }) => transform};
    margin-left: ${({ marginLeft }) => marginLeft || 0};
  `;

  const rtp = (rem) =>
    parseFloat(rem) * parseFloat(FONTSIZE) * parseFloat(FONTSIZE_DEFAULT);

  fontSize = fontSize.toString().includes('em') ? rtp(fontSize) : fontSize;

  let height = fontSize * lineHeight * lines;

  const variants = {
    normal: (
      <Box
        fontStyle={fontStyle}
        fontFamily={fontFamily}
        display={display}
        alignItems='center'
        textDecoration={textDecoration}
        borderBottom={borderBottom}
        textTransform={textTransform}
        textAlign={textAlign}
        overflow={overflow}
        marginLeft={marginLeft}
        fontWeight={fontWeight}
        className={className}
        justifyContent={justifyContent}
        // fontSize={fontSize + 'px'}
        fontSize={{ base: fontSizeResponsive, md: fontSize + 'px' }}
        marginRight={marginRight}
        transition={transition}
        transform={transform}
        color={COLORS[color] || COLORS['black']}>
        {children}
      </Box>
    ),
    maxtext: (
      <MaxText
        overflow={overflow}
        fontStyle={fontStyle}
        lines={lines}
        fontFamily={fontFamily}
        textDecoration={textDecoration}
        textTransform={textTransform}
        textAlign={textAlign}
        fontWeight={fontWeight}
        marginLeft={marginLeft}
        className={className}
        justifyContent={justifyContent}
        fontSize={fontSize + 'px'}
        height={height + 'px'}
        color={COLORS[color] || COLORS['black']}>
        {children}
      </MaxText>
    )
  };

  return variants[variant];
}

export default CVText;
