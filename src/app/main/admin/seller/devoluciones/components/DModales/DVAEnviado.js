import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVText from '@CVTemplate/core/CVText';
function DVAEnviado({ isOpen, onClose, process }) {
  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      header='Confirmación de envío de producto'
      bgHeader='red'
      colorHeader='white'
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            <CVButton onClick={() => process()} backgroundColor='red'>
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
        La tienda deberá notificar la conformidad de la recepción del producto
        devuelto. Te mantendremos al tanto de su respuesta.
      </CVText>
      <SizeBox />
      <CVText color='blue' textAlign='center' fontWeight='semibold'>
        No olvides enviar el comprobante del envío a devoluciones@covende.pe
        para procesar el respectivo reembolso.
      </CVText>
    </CVModal>
  );
}

export default DVAEnviado;
