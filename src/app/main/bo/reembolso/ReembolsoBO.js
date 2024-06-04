import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVButton from '@CVTemplate/core/CVButton';
import CVLink from '@CVTemplate/core/CVLink';
import CVPanel from '@CVTemplate/core/CVPanel';
import CVRow from '@CVTemplate/core/CVRow';
import CVText from '@CVTemplate/core/CVText';
import React, { useRef, useState } from 'react';
import RFiltros from './components/RFiltros';
import RTable from './components/RTable';

function ReembolsoBO() {
  const [filtro, setfiltro] = useState({
    daterange: [new Date(), new Date()],
    search: '',
    provenance: 'ambos',
    deposited: 'ambos',
    coupon_refund: false
  });

  const reff = useRef();

  return (
    <CVPanel variant='box'>
      <CVRow justifyContent='space-between' height='auto'>
        <CVText fontSize='2rem' fontWeight='bold' color='blue'>
          Reembolsos con depósitos a cuenta
        </CVText>
        <CVLink href='/bo/reembolso/cupon'>
          <CVButton>Reembolsos con cupón</CVButton>
        </CVLink>
      </CVRow>
      <SizeBox />
      <RFiltros filtro={filtro} setfiltro={setfiltro} reff={reff} />
      <SizeBox />
      <RTable
        filtro={filtro}
        setfiltro={setfiltro}
        setref={(ref) => (reff.current = ref)}
      />
    </CVPanel>
  );
}

export default ReembolsoBO;
