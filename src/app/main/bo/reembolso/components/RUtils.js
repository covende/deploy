import React from 'react';
import { Box } from '@chakra-ui/react';
import { RiEyeCloseLine } from 'react-icons/ri';
import { GiBleedingEye } from 'react-icons/gi';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import CVSelect from '@CVTemplate/core/CVSelect';
import { Text } from '@chakra-ui/react/';

export const RHeaders = (filtro, setfiltro) => [
  {
    first: true,
    data: 'numero',
    label: 'Nª',
    align: 'center'
  },
  {
    data: 'idreembolso',
    label: 'ID Reembolso'
  },
  {
    data: 'buyer',
    label: 'Comprador'
  },
  {
    data: 'provenance',
    label: (
      <CVSelect
        width='95%'
        color='white'
        value={filtro.provenance}
        onChange={(value) => setfiltro({ ...filtro, provenance: value })}
        options={[
          {
            value: 'ambos',
            text: 'Procedencia'
          },
          {
            value: 'CANCELLATION',
            text: 'Cancelaciòn'
          },
          {
            value: 'DEVOLUTION',
            text: 'Devoluciòn'
          }
        ]}
      />
    )
  },
  {
    data: 'request_date',
    label: 'Fecha de Solicitud'
  },
  {
    data: 'transaction_date',
    label: 'Fecha de Transaccion'
  },
  {
    data: 'order_unique',
    label: 'Pedido Único'
  },
  {
    data: 'coupon',
    label: 'Cupón'
  },
  {
    data: 'idtransaction',
    label: 'ID Transaccion Original'
  },
  {
    data: 'amount',
    label: 'Monto'
  },
  {
    align: 'center',
    data: 'depoist',
    label: (
      <CVSelect
        width='95%'
        color='white'
        value={filtro.deposited}
        onChange={(value) => setfiltro({ ...filtro, deposited: value })}
        options={[
          {
            value: 'ambos',
            text: 'Depositado'
          },
          {
            value: true,
            text: 'SI'
          },
          {
            value: false,
            text: 'NO'
          }
        ]}
      />
    )
  },
  {
    data: 'accion',
    label: 'Accion',
    type: 'render',
    last: true
  }
];

const provenance = {
  CANCELLATION: 'Cancelaciòn',
  DEVOLUTION: 'Devoluciòn'
};

export const RData = (lista) => {
  const data = lista.map((item, idx) => {
    return {
      numero: idx + 1,
      idreembolso: item.custom_id,
      buyer: item.buyer,
      provenance: provenance[item.provenance],
      request_date: (
        <Box>
          <Text>{CVFormatDate({ data: item?.request_date, time: false })}</Text>
          <Text
            bg='#17BF93'
            borderRadius='10px'
            color='white'
            textAlign='center'>
            {item.type}
          </Text>
        </Box>
      ),
      transaction_date: item?.transaction_date
        ? CVFormatDate({ date: item?.transaction_date, time: false })
        : '',
      order_unique: item.single_order,
      coupon: item.coupon,
      idtransaction: item.transaction_id,
      amount: `S/${item.amount}`,
      depoist: item.deposited ? 'SI' : 'NO',
      accion: (isOpen, onClose) => (
        <Box onClick={() => onClose()}>
          {isOpen ? (
            <RiEyeCloseLine style={{ fontSize: '2rem' }} />
          ) : (
            <GiBleedingEye style={{ fontSize: '2rem' }} />
          )}
        </Box>
      ),
      params: item._id,
      item: {
        idprovenance: item.provenance_id,
        deposit_date: item.deposit_date,
        agent_covende: item.agent_covende
      },
      borderColor: 'primary'
    };
  });
  return data;
};
