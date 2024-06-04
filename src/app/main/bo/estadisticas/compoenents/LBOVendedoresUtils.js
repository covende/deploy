import React from 'react';
import { CVMoneyFormat } from '@/common/CovendeTemplate/CVMethods';
import { Flex } from '@chakra-ui/layout';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { AiFillStar } from 'react-icons/ai';

export const bovheaders = [
  {
    label: 'N°',
    data: 'numero',
    first: true,
    align: 'center'
  },
  {
    label: 'Vendedor',
    data: 'vendedor'
  },
  {
    label: 'Reputación en Covende',
    data: 'reputation',
    align: 'center'
  },

  {
    label: 'Tasa de Pedidos',
    data: 'ordersrate',
    align: 'center'
  },
  {
    label: 'Tasa de Ventas',
    data: 'salesrate',
    align: 'center'
  },
  {
    label: 'Total',
    data: 'total',
    align: 'center',
    last: true
  }
];

export const bovrows = (lista) => {
  let data = lista.map((item, ndx) => ({
    numero: item.numero || ndx + 1,
    vendedor: item.name,
    reputation: item.reputation,
    ordersrate: item.ordersRate,
    salesrate: item.salesRate,
    salesRate: item.salesRate,
    total: item.total,
    borderColor: 'primary'
  }));
  return data;
};
