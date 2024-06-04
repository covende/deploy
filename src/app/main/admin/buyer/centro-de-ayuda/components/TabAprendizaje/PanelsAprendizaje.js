import React from 'react';
import { Box, Text, Center } from '@chakra-ui/react';
import icons from '../../assets/icons';

const PanelsAprendizaje = ({}) => {
  return (
    <Box px={30}>
      <Box bg='#FF5454' color='#FFF' px={9} py={2} mt={10} borderRadius={5}>
        <Text mx={10} fontSize='5xl' fontWeight='extrabold'>
          ¿Cómo es el proceso de crear un producto en CoVende?
        </Text>
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum .
        <Box ml={700} zIndex={2} bg='#FFF' borderRadius={5} height={180}>
          <Center>{icons.YouTube}</Center>
        </Box>
      </Box>

      <Box bg='#8080E8' color='#FFF' px={9} py={2} mt={10} borderRadius={5}>
        <Text mx={10} fontSize='5xl' fontWeight='extrabold'>
          Aprende a manejar la facturación de tus ventas en CoVende.
        </Text>
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum .
        <Box ml={700} bg='#FFF' borderRadius={5} height={180}>
          <Center>{icons.YouTube}</Center>
        </Box>
      </Box>
    </Box>
  );
};

export default PanelsAprendizaje;
