import React from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Flex } from '@chakra-ui/layout';
import { AiFillStar } from 'react-icons/ai';

export const CVDateFormat = (date, form = '/') => {
  const day =
    date.getDate() < 10 && date.getDate() > 0
      ? `0${date.getDate()}`
      : date.getDate();
  const month =
    date.getMonth() < 9 && date.getMonth() > 0
      ? `0${date.getMonth() + 1}`
      : date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}${form}${month}${form}${year}`;
};
export const headers = [
  {
    label: 'N°',
    data: 'numero',
    first: true,
    align: 'center'
  },
  {
    label: 'Nombre de Producto',
    data: 'producto'
  },
  {
    label: 'N° Pedidos',
    data: 'totalpedido',
    align: 'center'
  },
  {
    label: 'Venta Total (S/)',
    data: 'totalmonto',
    align: 'center'
  },
  {
    label: 'Calificación',
    data: 'puntuacion',
    last: true,
    align: 'center'
  }
];

export const rows = (lista) => {
  return lista.map((item, idx) => ({
    numero: idx + 1,
    producto: item.name,
    totalpedido: item.ordersQuantity,
    totalmonto: item.totalSales,
    puntuacion: (
      <Flex>
        {item.score}
        <SizeBox />
        <AiFillStar style={{ color: COLORS['yellow'] }} />
      </Flex>
    ),
    borderColor: 'primary'
  }));
};

export const mocks = [
  {
    product: 'Celular Samsung Metálico X...',
    totalpedido: '100',
    totalmonto: '2000.00',
    puntuacion: 5
  },
  {
    product: 'Celular Samsung Metálico X...',
    totalpedido: '100',
    totalmonto: '2000.00',
    puntuacion: 5
  },
  {
    product: 'Celular Samsung Metálico X...',
    totalpedido: '100',
    totalmonto: '2000.00',
    puntuacion: 5
  },
  {
    product: 'Celular Samsung Metálico X...',
    totalpedido: '100',
    totalmonto: '2000.00',
    puntuacion: 5
  },
  {
    product: 'Celular Samsung Metálico X...',
    totalpedido: '100',
    totalmonto: '2000.00',
    puntuacion: 5
  }
];

export const headersTimeFrame = (reputation30, reputation90, reputation180) => [
  {
    days: '30 días',
    date: reputation30.status
      ? `Del ${CVDateFormat(new Date(reputation30?.toDate))} al ${CVDateFormat(
          new Date(reputation30?.fromDate)
        )}`
      : 'No hay datos'
  },
  {
    days: '90 días',
    date: reputation90.status
      ? `Del ${CVDateFormat(new Date(reputation90?.toDate))} al ${CVDateFormat(
          new Date(reputation90?.fromDate)
        )}`
      : 'No hay datos'
  },
  {
    days: '180 días',
    date: reputation180.status
      ? `Del ${CVDateFormat(new Date(reputation180?.toDate))} al ${CVDateFormat(
          new Date(reputation180?.fromDate)
        )}`
      : 'No hay datos'
  }
];

export const dataTimeFrame = (reputation30, reputation90, reputation180) => [
  {
    startText: 'Reputación',
    days30: `${reputation30.reputation ?? 'ND'}%`,
    days90: `${reputation90.reputation ?? 'ND'}%`,
    days180: `${reputation180.reputation ?? 'ND'}%`
  },
  {
    startText: 'Cancelaciones',
    days30: `${reputation30.cancellations ?? 'ND'}%`,
    days90: `${reputation90.cancellations ?? 'ND'}%`,
    days180: `${reputation180.cancellations ?? 'ND'}%`
  },
  {
    startText: 'Devoluciones',
    days30: `${reputation30.devolutions ?? 'ND'}%`,
    days90: `${reputation90.devolutions ?? 'ND'}%`,
    days180: `${reputation180.devolutions ?? 'ND'}%`
  },
  {
    startText: 'Mensajes sin responder',
    days30: `${reputation30.unansweredMessages ?? 'ND'}%`,
    days90: `${reputation90.unansweredMessages ?? 'ND'}%`,
    days180: `${reputation180.unansweredMessages ?? 'ND'}%`
  }
];
