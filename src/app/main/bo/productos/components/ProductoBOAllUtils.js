import React from 'react';
import CVSwitch from '@/common/CovendeTemplate/CVSwitch';
import ProductVerifyAction from './ProductVerifyAction';
import { CVEstadoProducto } from '@CVTemplate/core/CVEstado/CVEstadoProducto';
import CVText from '@CVTemplate/core/CVText';
import CVSelect from '@CVTemplate/core/CVSelect';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import { moneyformat } from '@/common/utils/methods';

const statusOpts = {
  APPROVED: 'Fecha de aprobado',
  IN_REVIEW: 'Fecha en revisión',
  IN_DRAFT: 'Fecha en borrador',
  ELIMINATED: 'Fecha de eliminado',
  REJECTED: 'Fecha de rechazado',
  Todo: ' '
};

export const columnsData = (filterStatus, setFilterStatus) => [
  {
    label: 'N°',
    data: 'orden',
    first: true,
    align: 'center'
  },
  {
    label: 'ID Producto',
    data: 'product_id'
  },
  {
    label: 'Producto',
    data: 'producto_name'
  },
  {
    label: 'Vendedor',
    data: 'seller'
  },
  {
    label: 'Precio Uni. (S/)',
    data: 'price_unit'
  },
  {
    label: 'Precio x Mayor (S/)',
    data: 'price_volume'
  },
  { label: 'Oferta', data: 'offer' },
  {
    label: 'Stock',
    data: 'stock'
  },
  {
    label: (
      <CVSelect
        color='white'
        options={[
          { text: 'Todo', value: 'Todo' },
          { text: 'Aprobado', value: 'APPROVED' },
          { text: 'En Revisión', value: 'IN_REVIEW' },
          { text: 'En Borrador', value: 'IN_DRAFT' },
          { text: 'Eliminado', value: 'ELIMINATED' },
          { text: 'Rechazado', value: 'REJECTED' },
          { text: 'Activado', value: 'ACTIVED' }
        ]}
        value={filterStatus}
        onChange={(value) => setFilterStatus(value)}
      />
    ),
    data: 'status'
  },
  {
    label: 'Fecha de creación',
    data: 'fecha'
  },
  {
    label: statusOpts[filterStatus] || ' ',
    data: 'statusDate'
  },
  {
    label: 'Encargado',
    data: 'asesor'
  },
  {
    label: 'Activo',
    data: 'enable'
  },
  {
    label: 'Acciones',
    data: 'actions',
    last: true
  }
];

export const inputproceced = ({ data, method, permisionsProductBO }) => {
  const setNameAsesor = (asesor) => {
    if (asesor) {
      return (asesor?.first_name || '') + ' ' + (asesor?.last_name || '');
    } else {
      return '-';
    }
  };

  const setOffer = (offer, offer_type, offer_value) => {
    if (!offer) return '-';

    if (offer_type == 'FIXED') return `S/ ${moneyformat(offer_value || 0)}`;
    else if (offer_type == 'PERCENT') return `${offer_value}%`;
  };
  return data.map((item, index) => {
    return {
      params: item.product_id,
      status: item.status,
      orden: (method.page - 1) * 10 + (index + 1),
      product_id: item.custom_id,
      producto_name: item.product_name || '',
      seller: item?.store?.comercial_name
        ? item?.store?.comercial_name != '-'
          ? item?.store?.comercial_name
          : item?.store?.social_razon
        : '',
      price_unit: item.price_unit || '',
      price_volume: '-',
      stock: item.stock,
      offer: setOffer(item.offer, item.offer_type, item.offer_value),
      status: (
        <CVText color={CVEstadoProducto(item.status || 'IN_DRAFT').color}>
          {CVEstadoProducto(item.status || 'IN_DRAFT').text}
        </CVText>
      ),
      // fecha: (item.createdAt || item.updatedAt).toString().substring(0, 10),
      fecha: CVFormatDate({
        date: item.createdAt,
        format: 'DD/MM/YYYY',
        time: true
      }),
      statusDate:
        method.filterStatus != 'Todo'
          ? CVFormatDate({
              date: item.statusDate,
              format: 'DD/MM/YYYY',
              time: true
            })
          : '',
      enable: permisionsProductBO.editar && (
        <CVSwitch
          yesColor={item?.status == 'IN_DRAFT' ? 'gray' : 'primary'}
          noColor={item?.status == 'IN_DRAFT' ? 'gray' : 'red'}
          variant='capsule'
          value={item.product_active || false}
          onChange={(value) => {
            let enable = value || false;
            item.status == 'APPROVED'
              ? method.setattribute({
                  _id: item.product_id,
                  attribute: 'product_active',
                  boolean: enable,
                  up: true,
                  store_id: item.store_id
                })
              : CVAlertError({
                  addToast: method.addToast,
                  message: 'Debe aprobar primero el producto.'
                });
          }}
        />
      ),
      asesor: setNameAsesor(item?.ejecutivo),
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
