import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box } from '@chakra-ui/layout';
import React, { useState } from 'react';
import CBODataTable from './components/CBODataTable';
import CBOFiltros from './components/CBOFiltros';
import CBOTotales from './components/CBOTotales';

function CuponesBo() {
  const [filtro, setfiltro] = useState({
    search: '',
    status: ''
  });
  return (
    <Box>
      <SizeBox />
      <CBOTotales filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
      <CBOFiltros
        search={filtro.search}
        setsearch={(value) => setfiltro({ ...filtro, search: value })}
      />
      <SizeBox />
      <CBODataTable filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
    </Box>
  );
}

export default CuponesBo;
