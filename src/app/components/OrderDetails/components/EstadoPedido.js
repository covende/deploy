import React from 'react';
import FacturaPedido from './FacturaPedido';
import { Box, Stack, Text } from '@chakra-ui/react';
import CVTracking from '@/common/CovendeTemplate/CVTracking';
import { CVLine } from '@/common/CovendeTemplate';

function EstadoPedido({ data }) {
  return (
    <Box
      padding='16px'
      w='100%'
      h='auto'
      bg='white'
      borderRadius='16px'
      boxShadow='0px 2px 6px #00000040'
      boxSizing='border-box'>
      <Text width='max-content' color='covende.default.main' fontWeight='bold'>
        Estado del pedido
      </Text>

      <CVTracking
        variant='pedido'
        pedido_id={data?.information?.order_id}
        // idtracking={data.tracking.code}
        // trackings={data.tracking.registres}
        // status={data?.status?.type}
      />

      <Stack direction='row' h='auto' my='16px' alignItems='center'>
        <Text
          width='max-content'
          color='covende.success.main'
          fontSize='10px'
          fontWeight='bold'>
          COMPROBANTE
        </Text>
        <CVLine color='primary' lineHeight='1px' />
      </Stack>
      <FacturaPedido data={data} />
    </Box>
  );
}

export default EstadoPedido;
