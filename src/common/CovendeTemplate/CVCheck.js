import { Box, Flex } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { VscCircleLargeFilled } from 'react-icons/vsc';
import { CVText } from '.';
import SizeBox from '../components/CustomComponent/SizeBox';
import { COLORS } from './CVThemes';

/**
 *
 * @param {Object} param0
 * @param {String} param0.title
 * @param {('right' | 'left' | 'top' | 'bottom')} param0.titleAlign
 * @param {String} param0.titleColor
 * @param {Boolean} param0.value
 * @param {Function} param0.onChange
 * @param {String} param0.borderRadius
 * @param {('green' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'white' | 'gray' | 'black')} param0.bgCheck
 * @param {('green' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'white' | 'gray' | 'black')} param0.bgUnCheck
 * @param {any} param0.checkIcon
 * @param {any} param0.unCheckIcon
 * @param {('green' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'white' | 'gray' | 'black')} param0.checkColor
 * @param {String} param0.height
 * @param {String} param0.minHeight
 * @param {String} param0.width
 * @param {String} param0.fontSize
 * @param {('start' | 'center' | 'end')} param0.justifyContent
 * @returns
 */
function CVCheck({
  title = '',
  titleAlign = 'right' || 'left' || 'top' || 'bottom',
  titleColor = 'black',
  value = false,
  onChange = () => {},
  borderRadius = '0.3rem',
  bgCheck = 'white',
  bgUnCheck = 'white',
  checkIcon = <VscCircleLargeFilled />,
  checkColor = 'green' ||
    'primary' ||
    'skyblue' ||
    'blue' ||
    'red' ||
    'yellow' ||
    'white' ||
    'gray' ||
    'black',
  unCheckIcon = <Box></Box>,
  height = '1.5rem',
  minHeight = '1.5rem',
  width = false,
  fontSize = '1rem',
  justifyContent = 'start' || 'center' || 'end'
}) {
  let directions = {
    right: 'row',
    left: 'row-reverse',
    top: 'column',
    bottom: 'column-reverse'
  };

  const [valor, setvalor] = useState(true);
  useEffect(() => {
    if (value != valor) {
      setvalor(value);
    }
  }, [value]);

  return (
    <Flex
      justifyContent={justifyContent}
      onClick={() => onChange(!value || false)}
      alignContent='center'
      flexDirection={directions[titleAlign]}
      fontSize={fontSize}
      padding='0.5rem'>
      <CVText color={titleColor} fontSize={fontSize}>
        {title}
      </CVText>
      {title != '' ? <SizeBox /> : ''}
      <Box
        border={'1px solid ' + COLORS['primary']}
        height={height}
        width={width || height}
        minHeight={minHeight}
        minWidth={minHeight}
        fontSize={fontSize}
        rounded={borderRadius}
        backgroundColor={COLORS[value ? bgCheck : bgUnCheck]}
        display='flex'
        justifyContent='center'
        alignItems='center'
        color={COLORS[checkColor]}>
        {valor ? checkIcon : unCheckIcon}
      </Box>
    </Flex>
  );
}

export default CVCheck;
