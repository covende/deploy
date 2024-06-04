import React from 'react';

import { Box, Divider, Flex } from '@chakra-ui/react';

import { CVText } from '@CVTemplate/core/index';
import { TextLeft } from '../OrderDetails';

function InformationPedido({ data }) {
  return (
    <Box mb='18px'>
      <TextLeft fontWeight='bold' width='max-content'>
        Información del pedido
      </TextLeft>
      <Divider mb='8px' />
      <Flex width='100%' flexDirection='column'>
        <Flex width='100%'>
          <Flex width='40%'>
            <CVText fontWeight='500'>ID del pedido</CVText>
          </Flex>
          <Flex width='60%'>
            <CVText fontWeight='400'>{data?.information?.custom_id}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='40%'>
            <CVText fontWeight='500'>Fecha de compra</CVText>
          </Flex>
          <Flex width='60%'>
            <CVText fontWeight='400'>{data?.information?.order_date}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='40%'>
            <CVText fontWeight='500'>DNI</CVText>
          </Flex>
          <Flex width='60%'>
            <CVText fontWeight='400'>{data?.buyer?.number_document}</CVText>
          </Flex>
        </Flex>

        {data.information?.invoice_emit == 'Factura' && (
          <Flex width='100%'>
            <Flex width='40%'>
              <CVText fontWeight='500'>RUC</CVText>
            </Flex>
            <Flex width='60%'>
              <CVText fontWeight='400'>
                {data?.information?.customer_document}
              </CVText>
            </Flex>
          </Flex>
        )}

        <Flex width='100%'>
          <Flex width='40%'>
            <CVText fontWeight='500'>Medio de Pago</CVText>
          </Flex>
          <Flex width='60%'>
            <CVText fontWeight='400'>
              {data?.information?.payment_method}
            </CVText>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default InformationPedido;
