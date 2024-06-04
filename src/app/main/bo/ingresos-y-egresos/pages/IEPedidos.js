import React, { useState } from 'react';
import IEPFiltro from './IEPedidos/IEPFiltro';
import IEPTable from './IEPedidos/IEPTable';

import CVPanel from '@CVTemplate/core/CVPanel';
import CVText from '@CVTemplate/core/CVText';

import { Box, Flex } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVLink from '@CVTemplate/core/CVLink';
import CVButton from '@CVTemplate/core/CVButton';

const IEPedidos = () => {
  const [filtro, setfiltro] = useState({
    search: '',
    daterange: [new Date(), new Date()]
  });
  return (
    <CVPanel height='auto' variant='box'>
      <Flex justifyContent='space-between'>
        <CVText fontWeight='bold' color='blue' fontSize='1.5rem'>
          Ingresos por Pedido
        </CVText>
        <Box>
          <CVLink
            href='/bo/ingresos-y-egresos/pedidos/procesados'
            text={<CVButton>Pedidos Procesados</CVButton>}
          />
        </Box>
      </Flex>
      <SizeBox />
      <IEPFiltro filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
      <IEPTable filtro={filtro} type={false} />
    </CVPanel>
  );
};

export default IEPedidos;
