import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react/';
const Percentage = ({ percentage }) => {
  return (
    <Flex p='3px 4px' bg='#FF5454' borderRadius='12px' align='center'>
      <Text fontSize='12px' fontWeight='bold' color='white'>
        {percentage + '%'}
      </Text>
      <svg
        width='9'
        height='11'
        viewBox='0 0 9 11'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M4.08526 0.187438L4.08467 0.188013L0.865108 3.52712C0.623919 3.77727 0.624817 4.18188 0.867213 4.43088C1.10958 4.67985 1.50159 4.67889 1.74281 4.42874L3.90438 2.18686L3.90438 10.361C3.90438 10.7139 4.18157 11 4.52352 11C4.86548 11 5.14267 10.7139 5.14267 10.361L5.14267 2.1869L7.30423 4.42871C7.54545 4.67886 7.93747 4.67982 8.17983 4.43085C8.42226 4.18185 8.42309 3.77721 8.18194 3.52709L4.96237 0.187981L4.96179 0.187405C4.71976 -0.062874 4.32648 -0.0620748 4.08526 0.187438Z'
          fill='white'
        />
      </svg>
    </Flex>
  );
};
const TraficWeb = ({ percentage }) => {
  return (
    <Box w='100%' mt='5px'>
      <Flex w='100%' justify='space-between'>
        <Text color='#6F7273' fontSize='11px' fontWeight='600'>
          Google Chrome
        </Text>
        <Percentage percentage={percentage / 2} />
      </Flex>
      <Flex mt='.5rem'>
        <Box
          transition='width .5s ease'
          bg='#FF5454'
          w={`${percentage / 2}%`}
          h='.4rem'
          position='absolute'
        />
        <Box bg='#E7E7E7' w='100%' h='.4rem' />
      </Flex>
    </Box>
  );
};

export default TraficWeb;
