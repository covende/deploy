import { Box, Text } from '@chakra-ui/react/';
import React from 'react';

const BannerRosa = ({ title, price, type }) => {
  const variant = {
    subastas: (
      <Box
        backgroundImage="url('https://covendefiles.s3.amazonaws.com/images/banner-adds.png')"
        backgroundRepeat='no-repeat'
        px='10px'
        h='14rem'>
        <Box w='40%'>
          <Text
            fontSize='21px'
            fontWeight={700}
            color='white'
            mb='1.7rem'
            w='110%'>
            {title}
          </Text>
          <Box bg='#00365B' borderRadius='10px' p='.6rem' textAlign='center'>
            <Text textTransform='uppercase' fontSize='8px' color='white'>
              precio base desde
            </Text>
            <Text color='#FFB93E' fontSize='18px' fontWeight='bold'>
              S/ {price}.00
            </Text>
          </Box>
        </Box>
      </Box>
    ),
    download: (
      <Box
        backgroundImage="url('https://covendefiles.s3.amazonaws.com/images/banner-downloadApp.png')"
        backgroundRepeat='no-repeat'
        px='10px'
        h='14rem'></Box>
    )
  };
  return <Box>{variant[type]}</Box>;
};

export default BannerRosa;
