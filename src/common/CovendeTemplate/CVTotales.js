import { Box, Flex } from '@chakra-ui/layout';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { CVButton } from '.';
import { SCREEN } from './CVThemes';
import { FaTimes } from 'react-icons/fa';
import SizeBox from '../components/CustomComponent/SizeBox';

/**
 *
 * @param {Object} param0
 * @param {[{value:String, color:('white' | 'primary' | 'skyblue' | 'blue' | 'red' | 'yellow' | 'green' | 'gray' | 'black' | 'lightGray'), text: any}]} param0.lista
 * @param {String} param0.value
 * @param {Function} param0.onChange
 * @param {String} param0.height
 * @param {String} param0.fontSize
 * @returns
 */
function CVTotales({
  lista = [],
  value = '',
  onChange = (value) => {},
  height = '5rem',
  fontSize = '1.5rem'
}) {
  const [toggle, settoggle] = useState(window.screen.width < SCREEN.xs.max);
  return (
    <>
      {window.screen.width < SCREEN.xs.max && (
        <CVButton onClick={() => settoggle(!toggle)}>
          Ver Totales <SizeBox />
          <FaTimes />
        </CVButton>
      )}
      <Flex
        justifyContent='space-around'
        width='100%'
        wrap='wrap'
        display={!toggle ? 'flex' : 'none'}>
        {lista.map((item) => (
          <Box
            paddingTop='2px'
            paddingBottom='2px'
            minHeight={height}
            key={v4()}
            display='flex'
            width={
              window.screen.width < SCREEN.xs.max
                ? '100%'
                : 100 / lista.length - 1 + '%'
            }>
            <CVButton
              backgroundColor={item.color}
              width='100%'
              fontSize={fontSize}
              height={height}
              borderRadius='1rem'
              fontWeight={item.value == value ? 'bold' : 'normal'}
              onClick={() => onChange(item.value)}>
              {item.text}
            </CVButton>
          </Box>
        ))}
      </Flex>
    </>
  );
}

export default CVTotales;
