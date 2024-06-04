import { Container } from '@material-ui/core';
import React from 'react';
import TerminosCondiciones from '@CVPages/core/terminos-y-condiciones/TerminosCondiciones';
import { useSelector } from 'react-redux';
import PendingActiveStore from '../PendingActiveStore';
import { Text, Box, Center } from '@chakra-ui/react';
import { CVText } from '@/common/CovendeTemplate';

function Redirecciones(props) {
  const { store_status } = useSelector((state) => state.ProductView);

  return store_status != 'APPROVED' ? (
    <PendingActiveStore />
  ) : (
    <Container>
      <TerminosCondiciones />
    </Container>
  );
}

export default Redirecciones;
