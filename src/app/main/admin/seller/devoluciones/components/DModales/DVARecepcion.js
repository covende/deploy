import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVText from '@CVTemplate/core/CVText';
function DVARecepcion({ isOpen, onClose, process }) {
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
              ACEPTAR
            </CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />
      <CVText fontWeight='bold' color='blue' textAlign='center'>
        ¡Gracias!
      </CVText>
      <SizeBox />
      <CVText color='blue' textAlign='center'>
        Ahora que el producto devuelto está en tus manos, vamos a proceder con
        el reembolso al comprador.
      </CVText>
    </CVModal>
  );
}

export default DVARecepcion;
