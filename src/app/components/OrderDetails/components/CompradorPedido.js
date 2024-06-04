import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Box, Divider, Flex } from '@chakra-ui/react';
import { CVText } from '@CVTemplate/core/index';
import React from 'react';
import { TextLeft } from '../OrderDetails';

function CompradorPedido({ data }) {
  return (
    <Box>
      <SizeBox />
      <TextLeft fontWeight='bold'>Información del comprador</TextLeft>
      <Divider mb='8px' />
      <Flex width='100%' flexDirection='column'>
        <Flex width='100%'>
          <Flex width='50%'>
            <CVText fontWeight='500'>ID del comprador</CVText>
          </Flex>
          <Flex width='50%'>
            <CVText fontWeight='400'>{data.buyer.custom_id}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='50%'>
            <CVText fontWeight='500'>Nombre</CVText>
          </Flex>
          <Flex width='50%'>
            <CVText fontWeight='400'>{data.buyer.name} </CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='50%'>
            <CVText fontWeight='500'>DNI</CVText>
          </Flex>
          <Flex width='50%'>
            <CVText fontWeight='400'>{data.buyer.number_document}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='50%'>
            {' '}
            <CVText fontWeight='500'>Email</CVText>
          </Flex>
          <Flex width='50%'>
            <CVText fontWeight='400'>{data.buyer.email}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='50%'>
            <CVText fontWeight='500'>Teléfono</CVText>
          </Flex>
          <Flex width='50%'>
            <CVText fontWeight='400'>{data.buyer.celphone}</CVText>
          </Flex>
        </Flex>
        <Flex width='100%'>
          <Flex width='50%'>
            <CVText fontWeight='500'>Dirección</CVText>
          </Flex>
          <Flex width='50%'>
            {' '}
            <CVText fontWeight='400'>{data.buyer.address}</CVText>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CompradorPedido;
