import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';
import { Text } from '@chakra-ui/react/';
import React from 'react';
import { CVDateFormat } from '@CVPages/core/admin/seller/estadisticas/components/MVendidosUtils';

export const IEPPHeader = (filtro, setfiltro) => [
  { data: 'numero', label: 'N°', align: 'center', first: true },
  { data: 'idpedido', label: 'ID Pedido', align: 'center' },
  { data: 'transaction_date', label: 'Fecha transac', align: 'center' },
  // {
  //   data: 'status_date',
  //   label: (
  //     <CVSelect
  //       color='white'
  //       value={filtro.status}
  //       onChange={(value) => setfiltro({ ...filtro, status: value })}
  //       options={[
  //         { value: 'PROCESED', text: 'Procesado' },
  //         { value: 'PENDING', text: 'Pendiente' },
  //         { value: 'ANNULLED', text: 'Anulado' }
  //       ]}
  //     />
  //   ),
  //   align: 'center'
  // },
  { data: 'is_process', label: 'Procesado', align: 'center' },
  { data: 'fech_proc', label: 'Fecha Proc.', align: 'center' },
  { data: 'amount_send', label: 'Envíos (S/)', align: 'center' },
  { data: 'method_payment', label: 'Recaudación', align: 'center' },
  {
    data: 'comision_total',
    label: 'Comisión recaudación (S/)',
    align: 'center'
  },
  { data: 'comision_total_chyo', label: 'Patner Caja Hyo', align: 'center' },
  { data: 'other_input', label: 'Otros Ingresos (S/)', align: 'center' },
  { data: 'renta_total', label: 'Ganancia Total (S/)', align: 'center' },
  { data: 'send_found', label: 'Fondo de Envíos', align: 'center', last: true }
];
export const IEPPRow = (lista) => {
  const data = lista.map((item, idx) => {
    return {
      numero: idx + 1,
      idpedido: item.order,
      transaction_date: CVDateFormat(new Date(item.date_trx), '-'),

      is_process: (
        <Text
          bg={item.date_process ? '#17BF93' : '#FF5454'}
          p='2px 5px'
          borderRadius='5px'>
          {item.date_process ? 'Si' : 'No'}
        </Text>
      ),
      fech_proc: item.date_process
        ? CVDateFormat(new Date(item.date_process), '-')
        : '-',
      // status_date: item.status_date || '-',
      amount_send: CVMoneyFormat({ amount: item.shipments }),
      method_payment: item.collection,
      comision_total: CVMoneyFormat({ amount: item.commission }),
      comision_total_chyo: CVMoneyFormat({ amount: item.partner }),
      other_input: CVMoneyFormat({ amount: item.other_income }),
      renta_total: CVMoneyFormat({ amount: item.gain_total }),
      send_found: item.shipping_fund,
      borderColor: 'primary'
    };
  });
  return data;
};

export const IEPPData = [
  {
    idpedido: 'P001',
    transaction_date: '25-12-21',
    status_date: '-',
    amount_send: '9',
    method_payment: 'Niubiz',
    comision_total: '2.80',
    comision_total_chyo: '0.76',
    other_input: '-',
    renta_total: '5.34',
    send_found: '1'
  }
];
