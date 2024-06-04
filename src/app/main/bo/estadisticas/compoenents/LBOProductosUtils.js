import React from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVMoneyFormat } from '@/common/CovendeTemplate/CVMethods';
import { Flex } from '@chakra-ui/layout';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { AiFillStar } from 'react-icons/ai';

export const bopheaders = [
  {
    data: 'numero',
    align: 'center',
    first: true,
    label: 'N°'
  },
  {
    data: 'producto',
    label: 'Nombre de Producto'
  },
  {
    data: 'calificacion',
    align: 'center',
    label: 'Calificacion'
  },
  {
    data: 'vendedor',
    label: 'Vendedor'
  },
  {
    data: 'pedidos',
    align: 'center',

    label: 'N° Pedidos'
  },
  {
    data: 'venta_total',
    align: 'center',

    label: 'Venta Total (S/)'
  },
  {
    data: 'comision_total',
    align: 'center',
    last: true,
    label: 'Comisión Total (S/)'
  }
];

export const boprows = (lista) => {
  let data = lista.map((item) => ({
    numero: item.numero,
    producto: item.name,
    calificacion: (
      <Flex alignItems='center'>
        {item.score}
        <SizeBox />
        <AiFillStar style={{ color: COLORS['yellow'] }} />
      </Flex>
    ),
    vendedor: item.seller,
    pedidos: item.ordersQuantity,
    venta_total: CVMoneyFormat({ amount: item.totalSales }),
    comision_total: CVMoneyFormat({ amount: item.totalCommission }),
    borderColor: 'primary'
  }));
  return data;
};
