import React, { useState } from 'react';
import IEPFiltro from './IEPProcesados/IEPFiltro';
//import IEPTable from './IEPProcesados/IEPTable';

import IEPTable from './IEPedidos/IEPTable';

import CVPanel from '@CVTemplate/core/CVPanel';
import CVText from '@CVTemplate/core/CVText';

import { Box, Flex } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVLink from '@CVTemplate/core/CVLink';
import CVButton from '@CVTemplate/core/CVButton';

const IEPProcesados = () => {
  const [filtro, setfiltro] = useState({
    search: '',
    daterange: [new Date(), new Date()]
  });
  return (
    <CVPanel height='auto' variant='box'>
      <Flex justifyContent='space-between'>
        <CVText fontWeight='bold' color='blue' fontSize='1.5rem'>
          Pedidos Procesados
        </CVText>
        <Box>
          <CVLink
            href='/bo/ingresos-y-egresos/pedidos'
            text={<CVButton>Pedidos</CVButton>}
          />
        </Box>
      </Flex>
      <SizeBox />
      <IEPFiltro filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
      <IEPTable filtro={filtro} type={true} />
    </CVPanel>
  );
};

export default IEPProcesados;
