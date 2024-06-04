import { Flex, Box } from '@chakra-ui/react';
import { CVEstadoPedido } from '@CVTemplate/core/CVEstado/CVEstadoPedido';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import CVImage from '@CVTemplate/core/CVImage';
import CVText from '@CVTemplate/core/CVText';

import React from 'react';
import Acciones from './components/Acciones';
import { CVEstadoPago } from '@CVTemplate/core/CVEstado/CVEstadoPago';

export const headCells = [
  {
    label: 'Vendedor',
    data: 'store',
    first: true
  },
  {
    label: 'ID de Pedido',
    data: 'idPedido'
  },
  {
    label: 'Producto',
    data: 'product'
  },
  {
    label: 'Tipo Orden',
    data: 'order_type'
  },
  {
    label: 'Monto Total',
    data: 'amount'
  },
  {
    label: 'Medio de Pago',
    data: 'type_pay'
  },
  {
    data: 'estado',
    label: 'Estado del Pedido'
  },
  {
    label: 'Acciones',
    data: 'acciones',
    last: true
  }
];

export const rows = ({ lista = [], methods }) => {
  let data = lista.map((it, index) => {
    it = { ...it, status: it.status || 'PENDING_PAY' };
    return {
      store: (
        <Flex maxW='16rem'>
          <CVText marginRight='20px' textTransform='capitalize'>
            {it.company?.social_razon.toLowerCase()}
          </CVText>
        </Flex>
      ),
      idPedido: (
        <Flex>
          <CVText marginRight='20px'>{it.custom_id}</CVText>
        </Flex>
      ),
      product: (
        <Flex align='center'>
          <CVImage width='44px' height='35px' image={it.product?.photo} />
          <CVText
            variant='maxtext'
            lines={1}
            marginLeft='15px'
            textTransform='capitalize'>
            {it.producto.toLowerCase()}
          </CVText>
        </Flex>
      ),
      order_type: <CVText>{it.billing_type + ' - ' + it.buy_type}</CVText>,
      amount: <CVText>{CVMoneyFormat({ amount: it.total })}</CVText>,
      type_pay: (
        <Flex flexDirection='column' alignItems='center'>
          <CVImage height='30px' width='auto' image={it.methodPayment.image} />
          <CVText
            fontSize='0.85rem'
            width='215px'
            color={CVEstadoPago(it.payment_status).color}>
            {CVEstadoPago(it.payment_status).text}
          </CVText>
        </Flex>
      ),

      estado: (
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {CVEstadoPedido(it.status).icon}
          <CVText
            fontSize='0.75rem'
            color={CVEstadoPedido(it.status).color}
            fontWeight='bold'>
            {CVEstadoPedido(it.status).text}
          </CVText>
        </Box>
      ),
      acciones: (
        <Acciones
          id={it.pedido_id}
          setIdpedido={methods.setIdpedido}
          cancelapedido={methods.cancelapedido}
          onOpen={methods.onOpen}
          pedido={it}
          setpedido={methods.setpedido}
        />
      ),
      expand: false,
      // params: it.user_id,
      params: it.pedido_id,
      item: { ...it },
      borderColor: CVEstadoPedido(it.status).color
    };
  });
  return data;
};
