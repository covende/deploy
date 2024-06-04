import React, { useState } from 'react';

import { useDisclosure, Heading, Box } from '@chakra-ui/react';
import CMCardTotales from './components/CMCardTotales';
import { CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CMFiltros from './components/CMFiltros';
import CMMessage from './components/CMMessage';
import CMTabla from './components/CMTabla';
import { useDispatch } from 'react-redux';
import { updateSala } from '@CVPages/core/admin/mensajes/redux/salaActions';

function CentroMensajeriaBo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sala, setsala] = useState('');
  const dispatch = useDispatch();
  const [filtro, setfiltro] = useState({
    search: '',
    seller: false,
    buyer: false,
    motive: 'motive'
  });
  const [loading, setLoading] = useState(false);
  return (
    <Box>
      <CVText fontSize='2rem' fontWeight='bold' color='primary'>
        CENTRO DE MENSAJERÍA
      </CVText>
      {/* <SizeBox /> */}
      {/* <CMCardTotales /> */}
      <SizeBox />
      <CMFiltros filtro={filtro} setfiltro={setfiltro} />
      <SizeBox />
      <CMTabla
        filtro={filtro}
        setfiltro={setfiltro}
        onOpen={onOpen}
        setsala={setsala}
      />
      <SizeBox />

      <CMMessage
        isOpen={isOpen}
        onClose={() => {
          dispatch(updateSala({}));
          onClose();
        }}
        sala={sala}
      />
    </Box>
  );
}

export default CentroMensajeriaBo;
