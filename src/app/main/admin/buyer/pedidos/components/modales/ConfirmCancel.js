import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVButton from '@CVTemplate/core/CVButton';
import CVModal from '@CVTemplate/core/CVModal';
import CVText from '@CVTemplate/core/CVText';
import React from 'react';
import { Flex, Box } from '@chakra-ui/react';

const ConfirmCancel = ({ isOpen, onClose, process }) => {
  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      header='Cancelar Pedido'
      colorHeader='white'
      bgHeader='red'>
      <SizeBox />
      <CVText textAlign='center' color='blue' fontWeight='bold'>
        ¿Seguro que deseas cancelar el pedido?
      </CVText>
      <CVText textAlign='center' color='blue'>
        Las cancelaciones realizadas al día siguiente de haber generado el
        pedido pueden causar costos de reembolso.
      </CVText>
      <SizeBox />
      <Flex justifyContent='center'>
        <Box>
          <CVButton backgroundColor='red' onClick={() => process()}>
            ACEPTAR
          </CVButton>
        </Box>
      </Flex>
    </CVModal>
  );
};

export default ConfirmCancel;
