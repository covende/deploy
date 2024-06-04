import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import React, { useState } from 'react';
import { Flex, Box, useToast } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVText from '@CVTemplate/core/CVText';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { confirm_shipment_devolution } from '@CVApi/core/webdevolucion/DevService';

function DVCEnviado({ isOpen, onClose, process, iddevolucion, courier_type }) {
  const [loading, setloading] = useState(false);
  const addToast = useToast();

  const senddata = async () => {
    setloading(true);
    const result = await confirm_shipment_devolution(iddevolucion);
    if (result) {
      await process();
    } else {
      CVAlertError({ addToast, message: 'Ocurrieron Errores' });
    }
    setloading(false);
  };

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
            <CVButton
              onClick={() => senddata()}
              backgroundColor='red'
              isLoading={loading}
              disabled={loading}>
              CONFIRMAR
            </CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />
      <CVText fontWeight='bold' color='blue' textAlign='center'>
        {courier_type == 'propio'
          ? '¿Has enviado el producto al lugar indicado por el vendedor?'
          : '¿Has enviado el producto a la agencia de Olva más cercana?'}
      </CVText>
      <SizeBox />
      <CVText color='blue' textAlign='center'>
        Si das información falsa, el proceso de devolución será anulado.{' '}
      </CVText>
    </CVModal>
  );
}

export default DVCEnviado;
