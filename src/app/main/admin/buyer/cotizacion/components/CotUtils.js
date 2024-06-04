import React from 'react';
import { CVImage, CVText } from '@/common/CovendeTemplate';
import {
  CVFormatDate,
  CVMoneyFormat
} from '@/common/CovendeTemplate/CVMethods';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import { Box, Flex } from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import SizeBox from '@/common/components/CustomComponent/SizeBox';

export const BVHeaders = [
  { label: 'Fecha de Solicitud', data: 'request_date' },
  { label: 'Producto', data: 'producto' },
  { label: 'Detalles de la Cotización Solicitada', data: 'datails' },
  { label: 'Información del Vendedor', data: 'information' },
  { label: 'Respuesta a la Cotización', data: 'response', type: 'render' }
];

export const BCRows = (lista, methods) => {
  let data = lista.map((item) => ({
    request_date: CVFormatDate({ date: item.request_date }),
    producto: (
      <Flex>
        <CVImage
          image={item?.product?.photo || item.product_photo}
          height='50px'
          width='50px'
        />
        <SizeBox />
        <Box>
          <CVText fontWeight='bold' color='blue' variant='maxtext'>
            {CVMoneyFormat({ amount: item?.product?.precio_minimo }) +
              ' - ' +
              CVMoneyFormat({ amount: item?.product?.precio_maximo })}
          </CVText>
          <CVText color='blue' variant='maxtext'>
            {item?.product?.name}
          </CVText>
          <CVText fontWeight='bold' color='gray' variant='maxtext'>
            {item?.product?.pedido_minimo} (PM)
          </CVText>
        </Box>
      </Flex>
    ),
    datails: (
      <Box>
        <CVText>
          <span style={{ color: COLORS['blue'] }}>Cantidad: </span>
          {item.quantity} {item.measure_unit}
        </CVText>
        <CVText>
          <span style={{ color: COLORS['blue'] }}>Tiempo: </span>
          {item?.delivery_time?.value} {item?.delivery_time?.type}
        </CVText>
        <SizeBox />
        <CVText variant='maxtext'>
          <span style={{ color: COLORS['blue'] }}>Mensaje: </span>
          {item.message}
        </CVText>
      </Box>
    ),
    information: (
      <Flex>
        <CVImage
          image={item?.seller?.photo || item?.seller?.store?.logo}
          height='50px'
          width='50px'
        />
        <SizeBox />
        <Box>
          <CVText fontWeight='bold' color='blue' variant='maxtext'>
            {item?.seller?.first_name + ' ' + item?.seller?.last_name}
          </CVText>
          <CVText color='blue'>Peru</CVText>
          <CVText fontWeight='bold' color='blue' variant='maxtext'>
            {item?.seller?.store?.comercial_name}
          </CVText>
        </Box>
      </Flex>
    ),
    response: (expand, setexpand) => (
      <Flex justifyContent='space-between' width='100%'>
        <CVText variant='maxtext' lines={3}>
          {item.message}
        </CVText>
        <Box fontSize='3rem' color={COLORS['blue']} onClick={() => setexpand()}>
          {expand ? <FaEye /> : <FaEyeSlash />}
        </Box>
      </Flex>
    ),
    params: item._id,
    item
  }));
  return data;
};
