import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import React, { useState } from 'react';
import { Flex, Box, useToast } from '@chakra-ui/react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVText from '@CVTemplate/core/CVText';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { unsatisfied_product_devolution } from '@CVApi/core/webdevolucion/DevService';
function DVCRechazo({ isOpen, onClose, process, iddevolucion }) {
  const [loading, setloading] = useState(false);
  const addToast = useToast();

  const senddata = async () => {
    setloading(true);
    const result = await unsatisfied_product_devolution(iddevolucion);
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
      header='Confirmación de recepción'
      bgHeader='primary'
      colorHeader='white'
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            <CVButton
              disabled={loading}
              isLoading={loading}
              onClick={() => senddata()}
              backgroundColor='green'>
              CONFIRMAR
            </CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />
      <CVText fontWeight='bold' color='blue' textAlign='center'>
        ¿No estás conforme con el producto devuelto?
      </CVText>
    </CVModal>
  );
}

export default DVCRechazo;
