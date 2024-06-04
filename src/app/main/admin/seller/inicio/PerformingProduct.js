import React from 'react';
import { Flex, Heading, Box } from '@chakra-ui/react/';
import { COLORS } from '@CVTemplate/core/CVThemes';

const CheckIcon = () => (
  <svg
    width='14'
    height='8'
    viewBox='0 0 14 8'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M1.08008 4.44392L4.53641 7.00013L12.0251 1.46167'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

function PerformingProduct({ perform = 'Bueno' }) {
  const bg =
    perform == 'Bueno' ? 'green' : perform == 'Malo' ? 'red' : 'orange';
  return (
    <Flex align='center' gap='.5rem'>
      <Flex
        justify='center'
        align='center'
        borderRadius='50%'
        h='1.5rem'
        w='1.5rem'
        bg={COLORS[bg]}>
        <CheckIcon />
      </Flex>
      <Heading as='h2' fontWeight='600' fontSize='12px' color={COLORS[bg]}>
        {perform}
      </Heading>
    </Flex>
  );
}

export default PerformingProduct;
