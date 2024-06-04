import { moneyformat } from '@/common/utils/methods';
import { Box, Divider, Flex } from '@chakra-ui/react';
import React from 'react';
import { TextLeft } from '../OrderDetails';

function PrecioPedido({ data }) {
  return (
    <Box>
      <TextLeft fontWeight='bold'>Precio</TextLeft>
      <Divider mb='8px' />
      <Flex width='100%' flexDirection='column'>
        <Flex width='100%'>
          <Flex width='50%'>Subtotal</Flex>
          <Flex width='50%'>S/ {moneyformat(data?.price?.subtotal || 0)}</Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='50%'>IGV</Flex>
          <Flex width='50%'>S/ {moneyformat(data?.price?.igv || 0)}</Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='50%'>Total</Flex>
          <Flex width='50%'>S/ {moneyformat(data?.price?.total || 0)}</Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default PrecioPedido;
