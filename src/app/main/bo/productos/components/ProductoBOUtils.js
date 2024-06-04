import React from 'react';
import ProductVerifyAction from './ProductVerifyAction';
import { Text } from '@chakra-ui/react/';
import { CVEstadoProducto } from '@CVTemplate/core/CVEstado/CVEstadoProducto';
import { COLORS } from '@CVTemplate/core/CVThemes';
export const columnsData = [
  {
    first: true,
    label: 'N°',
    data: 'orden',
    align: 'center'
  },
  {
    label: 'Vendedor',
    data: 'seller'
  },
  {
    label: 'Producto',
    data: 'producto_name'
  },
  {
    label: 'Fecha de publicación ',
    data: 'date_publish'
  },
  {
    label: 'Precio (S/)',
    data: 'price'
  },
  {
    label: 'Tipo de carga',
    data: 'tipo_save'
  },
  {
    label: 'Estado',
    data: 'status'
  },
  {
    label: 'Acciones',
    data: 'actions',
    last: true
  }
];

export const inputproceced = ({ data, method, permisionsProductBO }) => {
  return data.map((item, index) => {
    const itemStatus = {
      color: CVEstadoProducto(item.status || 'IN_DRAFT')?.color,
      text: CVEstadoProducto(item.status || 'IN_DRAFT').text
    };
    return {
      params: item.product_id + '|' + item.store_id,
      orden: (method.page - 1) * 10 + (index + 1),
      seller: item?.store?.comercial_name
        ? item?.store?.comercial_name != '-'
          ? item?.store?.comercial_name
          : item?.store?.social_razon
        : '',
      producto_name: item.product_name || '',
      date_publish: (item.updatedAt || item.createdAt)
        .toString()
        .substring(0, 10),
      price: item.price_unit,
      tipo_save: item.type_of_load || '',
      status: <Text color={COLORS[itemStatus.color]}>{itemStatus.text}</Text>,
      actions: (
        <ProductVerifyAction
          action={() => {
            method.deleteproducto([item.product_id], item.store_id);
          }}
          product_id={item.product_id}
          store_id={item.store_id}
          permisionsProductBO={permisionsProductBO}
        />
      )
    };
  });
};
