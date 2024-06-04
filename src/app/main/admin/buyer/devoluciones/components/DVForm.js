import { CVPanel, CVText } from '@/common/CovendeTemplate';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useParams } from 'react-router';
import DFormulario from '../../../seller/devoluciones/components/DFormulario';
import { Container } from '@material-ui/core';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function DVForm() {
  //method = "consult"|"create"
  const { pedido_id, devolucion_id, method } = useParams();

  return (
    <Container>
      <CVText fontSize='1.5rem' fontWeight='bold' color='red'>
        Devoluciones
      </CVText>
      <SizeBox />
      <CVPanel itemDirection='column' padding='3rem'>
        <DFormulario
          method={method}
          iddevolucion={devolucion_id}
          idpedido={pedido_id}
          variant='buyer'
        />
      </CVPanel>
    </Container>
  );
}

export default DVForm;
