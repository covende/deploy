import React from 'react';
import { CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CBODataTableSol from './components/CBODataTableSol';
import { Container } from '@material-ui/core';
import { Flex } from '@chakra-ui/react';

function MarcasBoSolicitudes() {
  return (
    <Container style={{ backgroundColor: '#FFFFFF', padding: '1rem' }}>
      <Flex justifyContent='center'>
        <CVText fontSize='1.5rem' color='blue' fontWeight='bold'>
          Lista de solicitudes para creación de marcas
        </CVText>
      </Flex>
      <SizeBox />

      <CBODataTableSol />
    </Container>
  );
}

export default MarcasBoSolicitudes;
