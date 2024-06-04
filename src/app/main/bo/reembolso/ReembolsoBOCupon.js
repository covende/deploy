import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVButton from '@CVTemplate/core/CVButton';
import CVLink from '@CVTemplate/core/CVLink';
import CVPanel from '@CVTemplate/core/CVPanel';
import CVRow from '@CVTemplate/core/CVRow';
import CVText from '@CVTemplate/core/CVText';
import React, { useState } from 'react';
import RCFiltros from './components/RCFiltros';
import RCTable from './components/RCTable';

const ReembolsoBOCupon = () => {
  const [filtro, setfiltro] = useState({
    daterange: [new Date(), new Date()],
    search: '',
    provenance: 'ambos',
    deposited: 'ambos',
    coupon_refund: true
  });

  return (
    <CVPanel variant='box' height='100%'>
      <CVRow justifyContent='space-between' height='auto'>
        <CVText fontSize='2rem' fontWeight='bold' color='blue'>
          Reembolsos con cupón
        </CVText>
        <CVLink href='/bo/reembolso'>
          <CVButton>Reembolsos con cuenta</CVButton>
        </CVLink>
      </CVRow>
      <SizeBox />
      <RCFiltros filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
      <RCTable filtro={filtro} setfiltro={setfiltro} />
    </CVPanel>
  );
};

export default ReembolsoBOCupon;
