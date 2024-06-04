import { CVDateFormat } from '@CVPages/core/admin/seller/estadisticas/components/MVendidosUtils';
import CVLink from '@CVTemplate/core/CVLink';
import React from 'react';

export const IEDepHeader = [
  { data: 'numero', label: 'N°', align: 'center', first: true },
  { data: 'code', label: 'Corte quincenal', align: 'center' },
  { data: 'date', label: 'Fecha', align: 'center' },
  { data: 'gross_income', label: 'I. Bruto', align: 'center' },
  { data: 'shipments', label: 'Envíos', align: 'center' },
  { data: 'deposit', label: 'Depósitos', align: 'center' },
  { data: 'excess_send', label: 'Exceso de env.', align: 'center' },
  { data: 'comission_cv', label: 'Comisión CV', align: 'center' },
  { data: 'other_comissions', label: 'Otras comisiones', align: 'center' },
  {
    data: 'dcto_devolution_cancellation',
    label: 'desct. por devoluc. o cambio',
    align: 'center'
  },
  { data: 'refund', label: 'Reembolsos a compradores', align: 'center' },
  { data: 'balance', label: 'Balance', align: 'center', last: true }
];

export const IEDepRow = (lista) => {
  const data = lista.map((item, idx) => {
    return {
      numero: item.number || idx + 1,
      code: (
        <CVLink href={`/bo/ingresos-y-egresos/depositos/${item.code}`}>
          {item.code}
        </CVLink>
      ),
      date: CVDateFormat(new Date(item.date), '-'),
      gross_income: item.gross_income,
      shipments: item.shipments,
      deposit: item.deposit,
      excess_send: item.excess_send,
      comission_cv: item.comission_cv,
      other_comissions: item.other_comissions,
      dcto_devolution_cancellation: item.dcto_devolution_cancellation,
      refund: item.refund,
      balance: item.balance,
      borderColor: 'primary'
    };
  });

  return data;
};

export const IEDepData = [
  {
    code: 'CS01012022',
    date: '07-01-22',
    gross_income: '0',
    shipments: '0',
    deposit: '0',
    comission_cv: '0',
    other_comissions: '0',
    dcto_devolution_cancellation: '0',
    refund: '0',
    balance: '0'
  }
];
