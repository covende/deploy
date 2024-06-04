import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVText } from '@/common/CovendeTemplate';
import { Text } from '@chakra-ui/react/';
import CVActionPedido from '@/common/CovendeTemplate/CVActions/CVActionsPedido';
import { CVEstadoPedido } from '@/common/CovendeTemplate/CVEstado/CVEstadoPedido';
import {
  CVFormatDate,
  CVMoneyFormat
} from '@/common/CovendeTemplate/CVMethods';
import React from 'react';

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
    align: 'center',
    first: true
  },
  {
    data: 'idpedido',
    label: 'ID Pedido'
  },
  {
    data: 'sale_date',
    label: 'Fecha de compra'
  },
  {
    data: 'seller_cod',
    label: 'ID Vendedor',
    align: 'center'
  },
  {
    data: 'seller_id',
    label: 'Vendedor'
  },
  {
    data: 'buyer_id',
    label: 'ID Comprador'
  },
  { data: 'price', label: 'Precio' },
  { data: 'buy_type', label: 'Tipo de Pedido', align: 'center' },
  {
    data: 'tracking_id',
    label: 'ID Tracking'
  },
  { data: 'estado', label: 'Estado' },
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
        pedido={it}
        pedido_id={it.pedido_id}
        status={it.status}
        permit_cancelled={it?.permit_cancelled || false}
        permisions={permisions}
      />
    );
    return {
      numero: index + 1,
      idpedido: it.custom_id,
      sale_date: CVFormatDate({ date: it.fecha_compra }),
      seller_id: (
        <Text maxW='15rem' textOverflow='ellipsis'>
          {it?.company?.comercial_name == '-'
            ? it?.company?.social_razon
            : it?.company?.comercial_name}
        </Text>
      ),
      seller_cod: it?.seller?.custom_id,
      buyer_id: it?.buyer?.custom_id,
      price: CVMoneyFormat({ amount: it.final_unit_price }),
      tracking_id: (
        <Text textAlign='center' w='100%'>
          {it.tracking?.remito || (it.courier_code == 'propio' ? '-' : '')}
        </Text>
      ),
      buy_type: (
        <CVText
          color={it.buy_type == 'compra' ? 'primary' : 'blue'}
          fontWeight='bold'>
          {it.buy_type}
        </CVText>
      ),
      estado: (
        <CVText color={CVEstadoPedido(it.status).color} fontWeight='bold'>
          {CVEstadoPedido(it.status).text}
        </CVText>
      ),
      acciones: actions,
      expand: false,
      params: it?.pedido_id,
      item: { ...it },
      borderColor: CVEstadoPedido(it.status).color
    };
  });
  return data;
};
