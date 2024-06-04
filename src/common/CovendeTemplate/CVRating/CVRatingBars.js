import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Flex, Progress } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import { v4 } from 'uuid';
import { CVText } from '..';

const BarraStyled = styled.div`
  & div {
    border-radius: 1rem;
  }
  & div > div {
    background-color: ${({ color }) => (color ? color : '#ff5454')};
  }
`;

function CVRatingBars({ totales, height = '1rem', color = '#F7B844', custom }) {
  return (
    <Box width='100%' style={custom}>
      {totales.map((item) => (
        <Flex key={v4()} padding='2px'>
          <Flex minWidth='3rem' justifyContent='center' alignItems='center'>
            <CVText>{item.score}</CVText>
            <SizeBox />
            <FaStar style={{ color: color }} />
          </Flex>
          <SizeBox />
          <Box
            minWidth='3rem'
            justifyContent='center'
            alignItems='center'
            width='100%'>
            <BarraStyled color={color}>
              <Progress
                height={height}
                value={Number(item.percentage.replace(/%/g, ''))}
                width='100%'
              />
            </BarraStyled>
          </Box>
          <Flex minWidth='3rem' justifyContent='center' alignItems='center'>
            <CVText color='gray'>{item.percentage}</CVText>
          </Flex>
        </Flex>
      ))}
    </Box>
  );
}

export default CVRatingBars;
