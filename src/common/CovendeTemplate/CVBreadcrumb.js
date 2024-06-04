import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { Container } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import { CVText } from '.';
import { COLORS } from './CVThemes';
import SizeBox from '../components/CustomComponent/SizeBox';

/**
 *
 * @param {Object} param0
 * @param {("transparent"|"white")} param0.backgroundColor
 * @param {[{uri:String, text:String}]} param0.data
 * @returns
 */
function CVBreadcrumb({ backgroundColor = 'transparent', data, color, fontWeight, fontSize }) {
  return (
    <Box backgroundColor={backgroundColor}>
      <Container>
        <Flex flexWrap='wrap' alignItems='center' height='3rem'>
          {data.map((item, idx) => (
            <CVText key={v4()} color={color ? color : COLORS['blue']} fontWeight={fontWeight} >
              <Link style={{color: `${color}`, fontWeight: `${fontWeight}`}} to={item.uri}>{item.text}</Link>
              <SizeBox />
              {idx < data.length - 1 && (
                <>
                  {'>'}
                  <SizeBox />
                </>
              )}
            </CVText>
          ))}
        </Flex>
      </Container>
    </Box>
  );
}

export default CVBreadcrumb;
