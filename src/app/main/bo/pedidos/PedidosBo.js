import React, { useState } from 'react';

import { Container } from '@material-ui/core';
import Totales from './components/Totales';
import TableData from './components/TableData';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

function PedidosBo() {
  const initFilter = {
    search: '',
    startdate: new Date(),
    enddate: new Date(),
    estado: '',
    buytype: ''
  };
  const [filtro, setFiltro] = useState(initFilter);

  return (
    <Container style={{ backgroundColor: '#FFFFFF', padding: '1rem' }}>
      <Totales setEstado={(value) => setFiltro({ ...filtro, estado: value })} />
      <SizeBox />
      <TableData {...{ initFilter, filtro, setFiltro }} />
    </Container>
  );
}

export default PedidosBo;
