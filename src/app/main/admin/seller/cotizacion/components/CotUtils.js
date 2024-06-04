import { Flex, Box } from '@chakra-ui/react';
import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import { CVText, CVImage, CVLink } from '@/common/CovendeTemplate';
import { v4 } from 'uuid';
import React from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

export const DCHeaders = [
  { label: 'N°', first: true, align: 'center', data: 'index' },
  { label: 'Producto', data: 'producto' },
  { label: 'Solicitante', data: 'solicitante' },
  { label: 'Fecha de solicitud', align: 'center', data: 'fecha' },
  {
    label: 'Acción',
    last: true,
    align: 'center',
    data: 'acciones',
    type: 'render'
  }
];

export const DCRows = (lista, methods) => {
  let data = lista.map((item, idx) => {
    const accion = (expand, setexpand) => (
      <Flex flexDirection='column' justifyContent='center' key={v4()}>
        <Box onClick={() => setexpand()}>
          <CVText color='primary'>{expand ? 'Ocultar' : 'Ver'} Detalle</CVText>
        </Box>
        {item.room_id == null ? (
          <Box
            onClick={() => {
              methods.setidcot(item._id);
              methods.setreply(true);
            }}>
            <CVText color='primary'>Responder</CVText>
          </Box>
        ) : (
          <CVLink
            text={<CVText color='primary'>Responder</CVText>}
            href={'/seller/mensajes/' + item._id}
          />
        )}
        <Box onClick={() => {}}>
          <CVText color='primary'>Eliminar</CVText>
        </Box>
      </Flex>
    );
    return {
      index: idx + 1,
      producto: (
        <Flex>
          <CVImage height='50px' width='50px' image={item?.product_photo} />

          <SizeBox />
          <Box>
            <CVText color='blue' fontWeight='bold'>
              {item?.product_name}
            </CVText>
            <CVText>
              {item?.quantity} {item?.measure_unit}
            </CVText>
          </Box>
        </Flex>
      ),
      solicitante: item?.user?.first_name + ' ' + item?.user?.last_name,
      fecha: CVFormatDate({
        date: item?.request_date
      }),
      acciones: accion,
      item: { ...item },
      params: item._id
    };
  });

  return data;
};
