import React from 'react';
import { estadoTexto } from '@/common/utils';
import CBOAcciones from './CBOAcciones';
import { v4 } from 'uuid';
import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import { CVSelect, CVText } from '@/common/CovendeTemplate';

export const cuponHeaders = ({ filtro, setfiltro }) => [
  { label: 'N°', data: 'numero', first: true, align: 'center' },
  { label: 'Nombre', data: 'codigo', align: 'center' },
  { label: 'Procedencia', data: 'provenance', align: 'center' },
  { label: 'Valor', data: 'valor', align: 'center' },
  { label: 'Inicio - Fin', data: 'dates', align: 'center' },
  { label: 'Usos - Límite', data: 'used', align: 'center' },
  {
    label: (
      <CVSelect
        color='white'
        options={[
          { text: 'Todos', value: '' },
          { text: 'Activos', value: 'Activo' },
          { text: 'Expirados', value: 'Expirado' },
          { text: 'Programados', value: 'Programado' },
          { text: 'Cancelados', value: 'Cancelado' }
        ]}
        value={filtro.status}
        onChange={(value) => setfiltro({ ...filtro, status: value })}
      />
    ),
    data: 'estado',
    align: 'center'
  },
  { label: 'Acciones', data: 'acciones', last: true, align: 'center' }
];

export const cuponrows = ({ lista, fetchdata }) => {
  const provenances = {
    CANCELLATION: 'Cancelación',
    PROMOTION: 'Promoción',
    DEVOLUTION: 'Devolución'
  };
  const statuses = {
    Activo: 'yellow',
    Expirado: 'gray',
    Cancelado: 'red'
  };
  let data = lista.map((item, idx) => ({
    numero: idx + 1,
    codigo: item.name,
    provenance: provenances[item.provenance],
    tipo: item.discount_type == 'PERCENT' ? 'Porcentaje' : 'Fijo',
    valor:
      (item.discount_type == 'PERCENT' ? '' : 'S/ ') +
      item.discount +
      (item.discount_type == 'PERCENT' ? '%' : ''),
    dates:
      CVFormatDate({ date: item.start_date }) +
      ' - ' +
      CVFormatDate({ date: item.expiration_date }),
    used: item.uses + ' de ' + item.maximum_uses,
    acciones: <CBOAcciones idcupon={item._id} fetchdata={fetchdata} />,
    estado: <CVText color={statuses[item.status]}>{item.status}</CVText>,
    status: item.status
  }));

  return data;
};

export const cuponmock = [
  {
    idcupon: v4(),
    numero: '1',
    codigo: 'PROMO10',
    origin: 'Covnede',
    tipo: 'Compra',
    valor: '10%',
    dates: '10 Ago 21 - 31 Ago 21',
    used: '3 - 20',
    status: 'ACTIVE'
  }
];
