import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVPanel, CVText } from '@/common/CovendeTemplate';
import React, { useState } from 'react';
import DBOFiltros from './components/DBOFiltros';
import DBOTableData from './components/DBOTableData';

function DevolucionesBo() {
  const [filtro, setfiltro] = useState({
    search: '',
    date_range: {
      desde: '',
      hasta: ''
    },
    active: true
  });
  return (
    <CVPanel itemDirection='column'>
      <CVText fontSize='2rem' fontWeight='bold' color='blue'>
        Devoluciones
      </CVText>
      <DBOFiltros filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
      <DBOTableData filtro={filtro} title='bo' />
    </CVPanel>
  );
}

export default DevolucionesBo;
