import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import React from 'react';
import { Box, Flex } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVText from '@CVTemplate/core/CVText';

function DProcesado({ isOpen, onClose }) {
  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      header='Solicitud Enviada'
      bgHeader='red'
      colorHeader='white'
      footer={
        <Flex justifyContent='center' width='100%'>
          <Box>
            <CVButton backgroundColor='red' onClick={() => onClose()}>
              Aceptar
            </CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />
      <CVText
        textAlign='center'
        color='blue'
        fontSize='1.2rem'
        fontWeight='bold'>
        Tu solicitud de devolución ha sido generada
      </CVText>
      <SizeBox />
      <CVText textAlign='center'>
        La tienda evaluará tu solicitud y nos pondremos en contacto contigo en
        un plazo máximo de 3 días hábiles.
      </CVText>
    </CVModal>
  );
}

export default DProcesado;
