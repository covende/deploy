import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal, CVText } from '@/common/CovendeTemplate';
import CVRadio from '@/common/CovendeTemplate/CVRadio';
import { Box, Flex, Text } from '@chakra-ui/react';
import { COLORS } from '@CVTemplate/core/CVThemes';
import React, { useState } from 'react';

function PedidoConfirm({ isOpen, onClose, process, masive = false }) {
  const [option, setoption] = useState('si');
  return (
    <CVModal
      colorHeader='white'
      header={<Text color={COLORS['primary']}>Listo!!</Text>}
      bgHeader='primary'
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            <CVButton onClick={() => process(option)}>CONTINUAR</CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />
      <CVText textAlign='center' color='green' fontWeight='bold'>
        ¿Ya tienes todo listo para enviar{' '}
        {masive ? 'los pedidos' : 'este pedido'}?
      </CVText>
      <SizeBox />
      <CVRadio
        itemDirection='column'
        value={option}
        onChange={(value) => setoption(value)}
        options={[
          { value: 'si', text: 'Sí' },
          { value: 'no', text: 'Aún no, ¿qué debo hacer?' }
        ]}
      />
    </CVModal>
  );
}

export default PedidoConfirm;
