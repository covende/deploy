import React, { useState } from 'react';

import { Box } from '@chakra-ui/react';
import { CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import TerminosTable from './componentes/terminosTable';

const Terminos = () => {
  return (
    <Box>
      <CVText fontSize='2rem' fontWeight='bold' color='primary'>
        terminos y condicicones 
      </CVText>
      <SizeBox />
      <TerminosTable/>
      <SizeBox />
    </Box>
  );
};

export default Terminos;
