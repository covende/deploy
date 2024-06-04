import CVPanel from '@CVTemplate/core/CVPanel';
import CVText from '@CVTemplate/core/CVText';
import React, { useState } from 'react';
import IEDepTable from './IEDepositos/IEDepTable';

import { Box, Flex } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import IEDepFiltro from './IEDepositos/IEDepFiltro';

const IEDepositos = () => {
  const [filtro, setfiltro] = useState({
    search: '',
    daterange: [new Date(), new Date()]
  });
  return (
    <CVPanel height='auto' variant='box'>
      <Flex justifyContent='space-between'>
        <CVText fontWeight='bold' color='blue' fontSize='1.5rem'>
          Depósitos por corte quincenal
        </CVText>
        <Box></Box>
      </Flex>
      <SizeBox />
      <IEDepFiltro filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
      <IEDepTable filtro={filtro} />
    </CVPanel>
  );
};

export default IEDepositos;
