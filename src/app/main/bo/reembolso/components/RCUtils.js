import React from 'react';
import { Box } from '@chakra-ui/react';
import { RiEyeCloseLine } from 'react-icons/ri';
import { GiBleedingEye } from 'react-icons/gi';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import CVSelect from '@CVTemplate/core/CVSelect';

export const RCHeaders = (filtro, setfiltro) => [
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
    data: 'idPedido',
    label: 'ID Pedido'
  },
  {
    data: 'request_date',
    label: 'Fecha de Solicitud'
  },
  {
    data: 'coupon',
    label: 'Cupòn'
  },
  {
    data: 'amount',
    label: 'Monto',
    last: true
  }
];

const provenance = {
  CANCELLATION: 'Cancelaciòn',
  DEVOLUTION: 'Devoluciòn'
};

export const RCData = (lista) => {
  const data = lista.map((item, idx) => {
    return {
      numero: idx + 1,
      idreembolso: item.custom_id,
      idPedido: item.custom_id.slice(1),
      buyer: item.buyer,
      provenance: provenance[item.provenance],
      request_date: CVFormatDate({ data: item?.request_date, time: true }),
      coupon: item.coupon,
      amount: item.amount,
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
