import React from 'react';
import { Box } from '@chakra-ui/layout';
import { FaEye } from 'react-icons/fa';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import CVSelect from '@CVTemplate/core/CVSelect';
import { width } from '@/../node_modules/dom-helpers/cjs/index';
import CVButton from '@CVTemplate/core/CVButton';
export const CMHeaders = (setfiltro, filtro) => [
  {
    first: true,
    label: 'N°',
    data: 'numero',
    align: 'center'
  },
  {
    label: 'N° caso ',
    data: 'case'
  },
  {
    label: 'De:',
    data: 'from',
    width: '100px'
  },
  {
    label: 'Para:',
    data: 'to',
    width: '100px'
  },
  {
    label: (
      <CVSelect
        color='white'
        options={[
          { text: 'Motivo', value: 'motive' },
          { text: 'Pedido', value: 'order' },
          { text: 'Devolución', value: 'devolution' },
          { text: 'Cancelación', value: 'cancellation' },
          { text: 'Corte de venta', value: 'sale_cut' }
        ]}
        value={filtro.motive}
        onChange={(value) => setfiltro({ ...filtro, motive: value })}
      />
    ),
    data: 'motive',
    align: 'center',
    width: '30px'
  },
  {
    label: 'Fecha de inicio',
    data: 'date'
  },
  {
    label: 'Mensajes no leídos',
    data: 'messages_no_read_bo'
  },
  {
    label: 'Acción',
    data: 'accion',
    last: true
  }
];

export const CMData = ({
  lista,
  methods,
  permisionsMensajeriaBo = { ver: true }
}) => {
  const getMotive = (motive) => {
    switch (motive) {
      case 'devolution':
        return 'Devolución';
      case 'cancellation':
        return 'Cancelación';
      case 'order':
        return 'Pedido';
      case 'quotation':
        return 'Cotización';
      case 'sale_cut':
        return 'Corte de venta';

      default:
        return motive;
    }
  };

  const getName = (entityChat) => {
    let name = entityChat.name;
    if (entityChat?.type == 'administrative') name += ' - Covende';
    return name;
  };

  return lista.map((item, index) => ({
    numero: (methods.page - 1) * methods.itemsPage + (index + 1),
    case: item.case,
    from: getName(item.created_by),
    to: getName(item.to),
    fecha: item.createdAt,
    motive: getMotive(item.type),
    date: CVFormatDate({ date: item.updatedAt }),
    accion: permisionsMensajeriaBo.ver && (
      <Box
        onClick={() => {
          methods.setsala(item);
          methods.onOpen();
        }}>
        <FaEye style={{ fontSize: '1.5rem' }} />
      </Box>
    ),
    expand: false,
    messages_no_read_bo: (
      <>
        {(item?.messages_no_read_bo || 0) > 0 ? (
          <CVButton
            backgroundColor='green'
            fontSize='12px'
            padding='3px 5px'
            width='50px'
            fontWeight='bold'
            height='auto'>
            {item?.messages_no_read_bo}
          </CVButton>
        ) : (
          0
        )}
      </>
    )
  }));
};
