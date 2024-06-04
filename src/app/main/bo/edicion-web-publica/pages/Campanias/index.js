import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';
import { CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CampaniaTable from './components/CampaniaTable';

const Campanias = () => {
  return (
    <Box>
      <CVText fontSize='2rem' fontWeight='bold' color='primary'>
        Correos para Campaña
      </CVText>
      <SizeBox />
      {/* <CMFiltros filtro={filtro} setfiltro={setfiltro} /> */}
      <SizeBox />
      <CampaniaTable />
    </Box>
  );
};

export default Campanias;
