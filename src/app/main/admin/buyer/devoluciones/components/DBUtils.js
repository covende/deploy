import React from 'react';
import { CVText } from '@/common/CovendeTemplate';
import DevProducto from './DevProducto';
import { CVMoneyFormat } from '@/common/CovendeTemplate/CVMethods';
import { Flex } from '@chakra-ui/react';
import { CVEstadoDevolucion } from '@/common/CovendeTemplate/CVEstado/CVEstadoDevolucion';
import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import DVAccion from './DVAccion';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

export const DBRows = (lista, methods) => {
  let data = lista.map((item) => {
    return {
      devolucion_id: item.devolucion_id,
      iddevolucion: (
        <CVText fontWeight='600' color='blue'>
          {item.iddevolucion}
        </CVText>
      ),
      producto: <DevProducto producto={item?.product} pedido={item?.pedido} />,
      price: CVMoneyFormat({ amount: item.pedido?.final_unit_price || 0 }),
      price_sended: CVMoneyFormat({ amount: item.pedido?.precio_envio || 0 }),
      price_total: (
        <CVText fontWeight='600' color='blue'>
          {CVMoneyFormat({ amount: item.pedido?.total || 0 })}
        </CVText>
      ),
      request_date: (
        <Flex flexDirection='column' alignItems='center'>
          <CVText> {CVFormatDate({ date: item.request_date })}</CVText>
          {item.request_status != 'REJECTED' && (
            <CVText
              color={CVEstadoDevolucion(item.request_status).color}
              fontWeight='bold'>
              {CVEstadoDevolucion(item.request_status).text}
            </CVText>
          )}
        </Flex>
      ),

      // status: (
      //   <Flex flexDirection='column' alignItems='center'>
      //     {CVEstadoDevolucion(item.request_status).icon}
      //     <SizeBox height='5px' />
      //     {item.request_status != 'REJECTED' && (
      //       <CVText
      //         fontWeight='bold'
      //         fontSize='0.85rem'
      //         color={
      //           CVEstadoDevolucion(item.status == 'X' ? 'PENDING' : item.status)
      //             .color
      //         }>
      //         {item.request_status != 'IN_REVIEW' &&
      //         item.request_status != 'REJECTED'
      //           ? CVEstadoDevolucion(
      //               item.status == 'X' ? 'PENDING' : item.status
      //             ).text
      //           : '-'}
      //       </CVText>
      //     )}
      //   </Flex>
      // ),

      status: (
        <Flex flexDirection='column' alignItems='center'>
          {CVEstadoDevolucion(item.status).icon}
          <SizeBox height='5px' />
          {item.status != 'REJECTED' && (
            <CVText
              fontWeight='bold'
              fontSize='0.85rem'
              color={CVEstadoDevolucion(item.status).color}>
              {item.status != 'IN_REVIEW' && item.status != 'REJECTED'
                ? CVEstadoDevolucion(item.status).text
                : '-'}
            </CVText>
          )}
        </Flex>
      ),
      acciones: <DVAccion devolucion={item} />,
      borderColor: 'gray'
    };
  });
  return data;
};

export const DBHeaders = [
  { data: 'iddevolucion', label: 'Devolucion', first: true, align: 'center' },
  { data: 'producto', label: 'Pedido' },
  { data: 'price_total', label: 'Total' },
  { data: 'request_date', label: 'Solicitud de Devolucion', align: 'center' },
  { data: 'status', label: 'Estado de Devolucion' },
  { data: 'acciones', label: 'Accion', last: true, align: 'center' }
];
