import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVText from '@CVTemplate/core/CVText';
function DVARechazo({ isOpen, onClose, process }) {
  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      header='Confirmación de recepción'
      bgHeader='primary'
      colorHeader='white'
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            <CVButton onClick={() => process()} backgroundColor='green'>
              IR A MENSAJERÍA
            </CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />
      <CVText color='blue' textAlign='center'>
        Comunícate con el comprador a través de Mensajería explicando las
        razones del rechazo del producto devuelto. Si dejas el asunto sin
        respuesta, daremos por hecho que aceptas el producto devuelto.
      </CVText>
    </CVModal>
  );
}

export default DVARechazo;
