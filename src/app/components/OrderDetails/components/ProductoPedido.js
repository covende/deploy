import React from 'react';

import { Box, Divider, Flex, Text } from '@chakra-ui/react';
import { v4 } from 'uuid';

import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVText } from '@CVTemplate/core/index';
import { TextLeft } from '../OrderDetails';

function ProductoPedido({ data }) {
  console.log({ data });

  const attributes = data.product.attributes
    ? JSON.parse(atob(data.product.attributes))
    : '';
  return (
    <Box>
      <SizeBox />
      <TextLeft fontWeight='bold'>Producto</TextLeft>
      <Divider mb='8px' />
      <Flex width='100%' flexDirection='column'>
        <Flex width='100%'>
          <Flex width='40%'>
            <CVText fontWeight='500'>Precio de Producto</CVText>
          </Flex>
          <Flex width='60%'>
            <CVText fontWeight='400'> S/ {data.product.price}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='40%'>
            <CVText fontWeight='500'>Precio de Envío</CVText>
          </Flex>
          <Flex width='60%'>
            <CVText fontWeight='400'> S/ {data.product.delivery_price}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='40%'>
            <CVText fontWeight='500'>Nombre</CVText>
          </Flex>
          <Flex width='60%'>
            <CVText fontWeight='400'>{data.product.name}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='40%'>
            <CVText fontWeight='500'> SKU </CVText>
          </Flex>
          <Flex width='60%'>
            <CVText fontWeight='400'>{data.product.sku}</CVText>
          </Flex>
        </Flex>

        <Flex>
          <CVText fontWeight='500'> Detalles </CVText>
          <Box w='6rem' />
          <Flex gap='1' my='0.5rem'>
            {attributes &&
              attributes.map((attribute) => {
                if (attribute.name === 'Color') {
                  return (
                    <Box
                      fontFamily='Roboto'
                      key={v4()}
                      boxShadow='0px 0px 1px 1px rgba(236,236,236,0.75)'
                      border='0.7px solid #E0E0E0'
                      width='1.25rem'
                      height='1.25rem'
                      backgroundColor={attribute.hexa}
                      margin='0 0.25rem'
                      rounded='3px'></Box>
                  );
                } else {
                  return (
                    <Text key={v4()}>
                      {' '}
                      {attribute.name}: {attribute.value}
                    </Text>
                  );
                }
              })}
          </Flex>
        </Flex>

        <Flex width='100%'>
          <Flex width='40%'>
            <CVText fontWeight='500'>ID</CVText>
          </Flex>
          <Flex width='60%'>
            <CVText fontWeight='400'>{data.product.custom_id}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='40%'>
            <CVText fontWeight='500'>Cantidad</CVText>
          </Flex>
          <Flex width='60%'>
            <CVText fontWeight='400'>{data.product.quantity}</CVText>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default ProductoPedido;
