export const IEDSHeader = [
  { data: 'numero', label: 'N°', align: 'center', first: true },
  { data: 'seller', label: 'Vendedor', align: 'center' },
  { data: 'ruc', label: 'RUC', align: 'center' },
  { data: 'bank_name', label: 'Nombre de banco', align: 'center' },
  { data: 'number_account', label: 'Número de cuenta', align: 'center' },
  { data: 'orders_quantity', label: 'Número de ventas', align: 'center' },
  { data: 'input_neto', label: 'Ingresos Brutos (S/)', align: 'center' },
  { data: 'own_shipping', label: 'Envío Propio (S/)', align: 'center' },
  { data: 'excess_send', label: 'Exceso de env.', align: 'center' },
  { data: 'comision_cv', label: 'Comisión CV (S/)', align: 'center' },
  { data: 'igv_comission_cv', label: 'IGV Comisión CV (S/)', align: 'center' },
  { data: 'discount_total', label: 'Total dscto (S/)', align: 'center' },
  {
    data: 'deposited_total',
    label: 'Depositar (S/)',
    align: 'center'
  },
  {
    data: 'partner',
    label: 'Partner',
    align: 'center'
  },
  {
    data: 'payment_status',
    label: 'Estado de pago',
    align: 'center'
  },
  {
    data: 'actions',
    label: 'Acciones',
    align: 'center',
    last: true
  }
];

import CVLink from '@CVTemplate/core/CVLink';
import { Box } from '@chakra-ui/react';
import React from 'react';
import { Tooltip } from '@chakra-ui/tooltip';
import { RiEyeFill } from 'react-icons/ri';
import CVText from '@CVTemplate/core/CVText';

export const IEDSRow = (lista) => {
  const actions = (weekly_cut_id, company_id) => (
    <Box>
      <CVLink
        href={`/bo/ingresos-y-egresos/depositos/${weekly_cut_id}/transactions/${company_id}`}
        text={
          <Box color='primary' fontSize='1.5rem' className='actions'>
            <Tooltip label='Ver Transacciones'>
              <span>
                <RiEyeFill />
              </span>
            </Tooltip>
          </Box>
        }
      />
    </Box>
  );

  const paymentStatus = {
    PENDING: (
      <CVText color='yellow' fontWeight='bold'>
        Pendiente
      </CVText>
    ),
    PAID: (
      <CVText color='green' fontWeight='bold'>
        Pagado
      </CVText>
    )
  };

  const data = lista.map((item, idx) => {
    return {
      numero: item?.number || idx + 1,
      seller: item?.seller,
      ruc: item?.ruc,
      number_account: item?.account_number,
      input_neto: item?.gross_income,
      excess_send: item.excess_send,
      comision_cv: item?.comission_cv,
      discount_total: item?.discount_total,
      deposited_total: item?.deposit,
      orders_quantity: item?.orders_quantity || 0,
      igv_comission_cv: item?.igv_comission_cv || 0,
      payment_status: paymentStatus[item?.payment_status] || '-',
      actions: actions(item?.weekly_cut_id, item?.company_id),
      params: item.company_id,
      partner: item?.partner || '-',
      bank_name: item?.bank_name || '-',
      borderColor: 'primary',
      own_shipping: item?.own_shipping || 0
    };
  });

  return data;
};
export const IEDSData = [
  {
    seller: 'Mi tienda SAC',
    ruc: '20456789090',
    number_account: '311 756483920 021',
    input_neto: '100.00',
    comision_cv: ' 10.00',
    discount_total: '0',
    deposited_total: '90.00'
  }
];
