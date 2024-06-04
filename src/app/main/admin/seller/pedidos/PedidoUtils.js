import React from 'react';
import { CVText, CVImage } from '@/common/CovendeTemplate';
import { CVMoneyFormat } from '@/common/CovendeTemplate/CVMethods';
import { formatDate } from '@/common/utils/methods';
import { CVEstadoPedido } from '@/common/CovendeTemplate/CVEstado/CVEstadoPedido';
import CVActionPedido from '@/common/CovendeTemplate/CVActions/CVActionsPedido';
import { Flex } from '@chakra-ui/react';
import { CVEstadoPago } from '@CVTemplate/core/CVEstado/CVEstadoPago';
import { useSelector } from 'react-redux';
import { listen } from '@/../node_modules/dom-helpers/cjs/index';
import { showPermissions } from '@/app/helpers/role';
import { Box, Center } from '@chakra-ui/react';

export const lestados = [
  {
    title: 'ALL',
    cantidad: 0
  },
  {
    title: 'PENDING',
    cantidad: 0
  },
  {
    title: 'PROCESSED',
    cantidad: 0
  },
  {
    title: 'SENDED',
    cantidad: 0
  },
  {
    title: 'COMPLETED',
    cantidad: 0
  }
];

export const headCells = [
  {
    data: 'numero',
    label: 'N°',
    first: true,
    align: 'center'
  },
  {
    data: 'nombre',
    label: 'Nombre del producto',
    align: 'center'
  },
  {
    data: 'idpedido',
    label: 'ID Pedido',
    align: 'center'
  },
  {
    data: 'sale_date',
    label: 'Fecha de compra',
    align: 'center'
  },
  {
    data: 'method_pay',
    label: 'Medio de pago',
    align: 'center'
  },
  { data: 'price', label: 'Precio', align: 'center' },
  {
    data: 'cantidad',
    label: 'Cantidad',
    align: 'center'
  },
  { data: 'estado', label: 'Estado', align: 'center' },
  {
    data: 'acciones',
    type: 'render',
    align: 'center',
    label: 'Acciones',
    last: true
  }
];

export const rows = ({ lista = [], acciones, permisions }) => {
  let data = lista.map((it, index) => {
    it = { ...it, status: it.status || 'PENDING_PAY' };
    const actions = (isOpen, onClose) => (
      <CVActionPedido
        acciones={acciones}
        isOpen={isOpen}
        onClose={onClose}
        pedido_id={it.pedido_id}
        pedido={it}
        status={it.status || 'PENDING_PAY'}
        permit_cancelled={it?.permit_cancelled || false}
        permisions={permisions}
      />
    );

    return {
      numero: it.number,
      celda: true,
      nombre: (
        <Box maxW='200px'>
          <CVText variant='maxtext'>{it.producto ?? ''} </CVText>
        </Box>
      ),
      idpedido: it.custom_id,
      sale_date: formatDate(it.fecha_compra),
      method_pay: (
        <>
          <Box>
            <Center>
              <CVImage
                height='30px'
                width='auto'
                image={it.methodPayment.image}
              />
            </Center>
          </Box>
          <Box mr={8}>
            <Center>
              <CVText
                fontSize='0.85rem'
                alignItems='center'
                color={CVEstadoPago(it.payment_status).color}>
                {CVEstadoPago(it.payment_status).text}
              </CVText>
            </Center>
          </Box>
        </>
      ),
      price: CVMoneyFormat({ amount: it.total }),
      cantidad: it.cantidad,
      estado: (
        <CVText color={CVEstadoPedido(it.status).color} fontWeight='bold'>
          {CVEstadoPedido(it.status).text}
        </CVText>
      ),

      acciones: actions,
      expand: false,
      params: it.pedido_id,
      item: { ...it },
      borderColor: CVEstadoPedido(it.status).color
    };
  });
  return data;
};

export const lista = [];
