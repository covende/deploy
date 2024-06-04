import React from 'react';
import { Box, Text, Center } from '@chakra-ui/react';

const PanelsAprendizaje = ({title, children, colorBg, icon}) => {
  return (
    <Box mt='58px' w='100%' paddingRight='100px'>
      <Box h='247px' display='flex' alignItems='end' position='relative'>
        <Box 
          bg={colorBg}
          px='23px' 
          py='30px' 
          w='100%'
          minH='201px'
          display='flex' 
          position='relative' 
          bottom={0}
          borderRadius='10px'
        >
          <Box w='67%' position='relative' h='164px'>
            <Text color='#fff' fontSize='35px' lineHeight='40px' fontWeight={700}>
              {title}
            </Text>
            <Text color='#fff' fontSize='12px' lineHeight='18px' fontWeight='normal'>
              {children}
            </Text>
          </Box>
        </Box>
          <Box height='100%' display='flex' alignItems='start' position='absolute' right={0} mr='-88px' marginBottom='20px'>
            <Box
              bg='#FFF' 
              borderRadius='5px' 
              height='228px'
              display='flex'
              alignItems='center'
              justifyContent='center'
              width='405.33px'
              boxShadow='rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;'
              zIndex={2}
              >
              <Center>{icon}</Center>
            </Box>
          </Box>
      </Box>
    </Box>
  );
};

export default PanelsAprendizaje;
