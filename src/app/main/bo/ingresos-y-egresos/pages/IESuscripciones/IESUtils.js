import React from 'react';
import CVText from '@CVTemplate/core/CVText';
import { CVMoneyFormat } from '@CVTemplate/core/CVMethods';

export const IESHeader = [
  { data: 'numero', label: 'N°', align: 'center', first: true },
  { data: 'idsuscription', label: 'ID Suscripción', align: 'center' },
  { data: 'seller', label: 'Vendedor', align: 'center' },
  { data: 'plan_name', label: 'Plan', align: 'center' },
  {
    data: 'suscription_start',
    label: 'Inicio (Fecha de pago)',
    align: 'center'
  },
  { data: 'suscription_end', label: 'Fin de plan', align: 'center' },
  { data: 'method_pay', label: 'Medio de pago', align: 'center' },
  { data: 'amount', label: 'Monto (S/)', align: 'center' },
  { data: 'partner', label: 'Partner', align: 'center' },
  { data: 'accion', label: 'Acción', align: 'center', last: true }
];

export const IESRow = (lista, PermisionsIngresosYE) => {
  const data = lista.map((item, idx) => {
    return {
      numero: idx + 1,
      idsuscription: item.id,
      seller: item.seller,
      plan_name: item.plan || '--',
      suscription_start: item.fecha_inicio,
      suscription_end: item.fecha_fin,
      method_pay: item.method_payment,
      amount: CVMoneyFormat({ amount: item.amount }) || '--',
      partner: item.partner || '--',
      accion: PermisionsIngresosYE.eliminar && (
        <CVText color='primary'>Cancelar</CVText>
      ),
      borderColor: 'primary'
    };
  });

  return data;
};

export const IESData = [
  {
    idsuscription: '01-01-23',
    seller: 'Mi tienda SAC',
    plan_name: 'Plan anual',
    suscription_start: '01-01-23',
    suscription_end: '01-01-23',
    method_pay: 'Visa',
    amount: 199,
    partner: 'Cyo'
  }
];
