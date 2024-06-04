import { Badge, Box, Flex, Text } from '@chakra-ui/layout';
import { CVEstadoProducto } from '@CVTemplate/core/CVEstado/CVEstadoProducto';
import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import SizeBox from '../components/CustomComponent/SizeBox';
import { CVText } from '../CovendeTemplate';
import { retailicon, wholesaleIcon } from './icons';

const estados = {
  BORRADOR: 'Borrador',
  IN_DRAFT: 'Borrador',
  PENDIENTE: 'Pendiente',
  PENDING: 'Pendiente',
  REVISION: 'En Revisión',
  PROCESADO: 'Procesado',
  APROVADO: 'Aprobado',
  APPROVED: 'Aprobado',
  ENVIADO: 'Enviado',
  RECHAZADO: 'Rechazado',
  REJECTED: 'Rechazado',
  DEVUELTO: 'Devuelto',
  RETURNED: 'Devuelto',
  ANULADO: 'Anulado',
  ANNULLED: 'Anulado',
  TERMINADO: 'Terminado',
  FINISHED: 'Terminado',
  COMPLETADO: 'Completado',
  ELIMINATED: 'Eliminado',
  D_PENDIENTE: 'Pendiente',
  D_REVISION: 'En Revisión',
  D_APROVADO: 'Aprobado',
  D_TERMINADO: 'Terminado',
  D_RECHAZADO: 'Rechazado'
};

const colores = {
  BORRADOR: '#efefef',
  IN_DRAFT: '#efefef',
  PENDIENTE: '#004772',
  PENDING: '#004772',
  REVISION: '#F7B844',
  ENVIADO: 'orange',
  PROCESADO: 'green',
  APROVADO: '#00ADF6',
  APPROVED: '#00ADF6',
  RECHAZADO: '#FF5454',
  REJECTED: '#FF5454',
  DEVUELTO: 'gray',
  RETURNED: 'gray',
  ANULADO: 'gray',
  ANNULLED: 'gray',
  TERMINADO: 'blue',
  FINISHED: 'blue',
  COMPLETADO: 'blue',
  ELIMINATED: 'black',
  D_PENDIENTE: '#004772',
  D_REVISION: '#F7B844',
  D_APROVADO: '#00ADF6',
  D_TERMINADO: 'blue',
  D_RECHAZADO: '#FF5454'
};

/**
 * Obtiene color segun estado
 * @param {String} status
 * @returns {String}
 */
export const estadoColor = (status) => colores[status] || colores['IN_DRAFT'];

/**
 * Obtiene Estado en una etiqueta con color de estado
 * @param {String} status
 * @returns
 */
export const estadoBadge = (status) => {
  return (
    <Box
      rounded='16px'
      as='button'
      borderRadius='md'
      style={{
        backgroundColor: colores[status],
        borderRadius: '16px',
        height: '32px',
        fontSize: '0.75rem'
      }}
      color='white'
      px={4}
      h={8}
      w={120}>
      <Typography style={{ color: '#FFFFFF' }}>{estados[status]}</Typography>
    </Box>
  );
};

/**
 * API para Consulta de DNI y RUC
 */
export const CONVENDE_CONSULT = 'https://evanzu.com/covende';

/**
 *
 * @param {String} condicion
 * @returns {String}
 */
export const condicion_producto = (condicion) => {
  let lista = {
    NEW: ' Nuevo',
    REPOWERED: 'Reacondicionado',
    USED: 'Usado'
  };
  return lista[condicion];
};

/**
 *
 * @param {String} origin
 * @returns {String}
 */
export const origin_producto = (origin) => {
  let lista = {
    MANUFACTURING: ' Fabricaciòn Propia',
    IMPORT: ' Importado',
    RESALE: ' Re-venta',
    DISTRIBUTION: 'Distribución'
  };
  return lista[origin];
};

/**
 *
 * @param {String} comprobante
 * @returns {String}
 */
export const comprobante_producto = (comprobante) => {
  let lista = {
    INVOICE: 'Factura',
    TICKET: 'Boleta',
    BOTH: 'Factura o Boleta'
  };
  return lista[comprobante];
};

/**
 *
 * @param {String} type_of_sale
 * @returns {String}
 */
export const typeofsale_producto = (type_of_sale) => {
  let lista = {
    RETAIL: 'Venta por Menor',
    WHOLESALE: 'Venta por Mayor',
    BOTH: 'Al por mayor y menor'
  };
  return lista[type_of_sale];
};

/**
 *
 * @param {String} type_of_sale
 * @returns {String}
 */
export const typeofsale_producto_icons = (type_of_sale) => {
  let lista = {
    RETAIL: <Box>{retailicon}</Box>,
    WHOLESALE: <Box>{wholesaleIcon}</Box>,
    BOTH: (
      <Flex alignItems='center'>
        <Box>{wholesaleIcon}</Box>
        <SizeBox /> <CVText> y </CVText>
        <SizeBox /> <Box>{retailicon}</Box>
      </Flex>
    )
  };
  return lista[type_of_sale];
};
