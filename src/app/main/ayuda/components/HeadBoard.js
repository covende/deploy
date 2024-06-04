import React, { useEffect } from 'react';
import { Grid, Container } from '@material-ui/core';
import { Box, Text } from '@chakra-ui/react';
import icons from '@/app/main/ayuda/assets/icons';
import { CVInput } from '@/common/CovendeTemplate';

const HeadBoard = ({ fetchSearch, type='buyer' }) => {
  return (
    <>
      <Box style={{ backgroundColor: '#FFFFFF', padding: '2rem' }}>
        <Text
          fontSize='4xl'
          fontWeight='extrabold'
          align='center'
          color='#FF5454'>
          Centro de Ayuda
        </Text>
      </Box>

      <Box
        bg='#FF5454'
        borderRadius='8'
        display='flex'
        h='126px'
        justifyContent='space-around'
        alignItems='center'
        w='100%'
        p='0'>
        <Box ml={20} mt={10}>
          {icons.leftFaqicon}
        </Box>

        <Grid item xs={12} sm={12} md={6}>
          <Box mt={5} mr={10} color='#FFFFFF' fontWeight='bold'>
            <Text fontSize='22px' fontWeight='600' align='right'>
              ¿Tienes dudas o problemas en CoVende? <br />
              Aquí puedes encontrar las soluciones.
            </Text>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default HeadBoard;
