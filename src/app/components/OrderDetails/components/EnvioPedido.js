import { Box, Divider, Flex } from '@chakra-ui/react';
import { CVText } from '@CVTemplate/core/index';
import React from 'react';
import { TextLeft } from '../OrderDetails';

function EnvioPedido({ data }) {
  return (
    <Box>
      <TextLeft fontWeight='bold'>Envío</TextLeft>
      <Divider mb='8px' />
      <Flex width='100%' flexDirection='column'>
        <Flex width='100%'>
          <Flex width='50%'>
            <CVText fontWeight='500'>ID tracking</CVText>
          </Flex>
          <Flex width='50%'>
            <CVText fontWeight='400'>{data.shipping.tracking_id}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='50%'>
            <CVText fontWeight='500'>Dirección de envío</CVText>
          </Flex>
          <Flex width='50%'>
            <CVText fontWeight='400'>{data.shipping.address}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='50%'>
            {' '}
            <CVText fontWeight='500'>Fecha de recolección</CVText>
          </Flex>
          <Flex width='50%'>
            <CVText fontWeight='400'>{data.shipping.date_pickup}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='50%'>
            <CVText fontWeight='500'>Fecha de entrega</CVText>
          </Flex>
          <Flex width='50%'>
            <CVText fontWeight='400'>{data.shipping.date_delivery}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='50%'>
            <CVText fontWeight='500'>Fecha de confirmación</CVText>
          </Flex>
          <Flex width='50%'>
            <CVText fontWeight='400'>{data.shipping.date_confirmation}</CVText>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default EnvioPedido;
