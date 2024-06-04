import { Container } from '@material-ui/core';
import React, { useState } from 'react';
import TableData from './components/TableData';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CotFiltros from './components/CotFiltros';
import { CVPanel, CVText } from '@/common/CovendeTemplate';

function BuyerCotizacion() {
  const [filtro, setfiltro] = useState({});

  return (
    <Container>
      <CVText fontSize='1.5rem' fontWeight='bold' color='red'>
        Cotizaciones Solicitadas
      </CVText>
      <SizeBox />
      <CotFiltros filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
      <CVPanel variant='box'>
        <TableData filtro={filtro} />
      </CVPanel>
    </Container>
  );
}

export default BuyerCotizacion;
