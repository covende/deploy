import SizeBox from '@/common/components/CustomComponent/SizeBox';
import React, { useState } from 'react';
import CFFiltro from './CFFiltro';
import CFTable from './CFTable';

const CFCovende = ({ FacturacionPermisions }) => {
  const [filtro, setfiltro] = useState({
    type: 'CUSTOMER',
    status: 'ALL',
    search: '',
    daterange: [new Date(), new Date()],
    type_sale: 'ALL'
  });
  return (
    <>
      <CFFiltro filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
      <CFTable
        filtro={filtro}
        setfiltro={setfiltro}
        FacturacionPermisions={FacturacionPermisions}
      />
    </>
  );
};

export default CFCovende;
