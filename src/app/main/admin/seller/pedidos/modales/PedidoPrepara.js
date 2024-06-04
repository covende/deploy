import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVLink, CVModal, CVText } from '@/common/CovendeTemplate';
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

function PedidoPrepara({ isOpen, onClose, process }) {
  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='primary'
      header='Prepara tu pedido'
      colorHeader='white'
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            <CVButton onClick={process}>ACEPTAR</CVButton>
          </Box>
        </Flex>
      }>
      <CVText fontWeight='bold' textAlign='center' color='blue'>
        Sigue el <br />
        <CVLink
          color='green'
          target='_blank'
          href='https://covendefiles.s3.amazonaws.com/documents/Manual+de+empaque+y+embalaje.pdf'
          text='Manual de empaque'
        />
        <br />
        para preparar correctamente tu pedido.
      </CVText>
      <SizeBox />
      <CVText textAlign='center' color='blue'>
        Ten en cuenta que incumplir los requisitos puede generar cargos
        adicionales a tu cuenta.
      </CVText>
    </CVModal>
  );
}

export default PedidoPrepara;
