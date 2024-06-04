import React from 'react';
import { Flex, Box } from '@chakra-ui/layout';
import styled from '@emotion/styled';
import { CVText } from '..';

export const CVTrackingStepIcon = ({ title, color, icono, track }) => {
  return (
    <Flex direction='column' alignItems='center' gap='5px' mx='5px'>
      {icono}
      <CVText textAlign='center' fontSize='0.85rem'>
        <span style={{ color }}>{title}</span>
      </CVText>
      <Box>
        <CVText color='gray' fontSize='0.85rem'>
          {/* {track?.date} */}
        </CVText>
        <CVText color='gray' fontSize='0.85rem'>
          {/* {track?.time} */}
        </CVText>
      </Box>
    </Flex>
  );
};

export const CVTrackingStepSimbol = styled.div`
  border: 2px solid ${({ color = 'gray' }) => color};
  font-size: 1.5rem;
  color: ${({ color = 'gray' }) => color};
  padding: 5px;
  width: calc(1.5rem + 20px);
  height: calc(1.5rem + 20px);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
