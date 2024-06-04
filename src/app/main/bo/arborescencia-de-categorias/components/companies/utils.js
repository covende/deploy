import React from 'react';
import { Link } from 'react-router-dom';

import { svgEdit } from '@/app/assets/images/SVG';
import { Flex } from '@chakra-ui/react';

import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';
import { Tooltip } from '@chakra-ui/tooltip';

export const inputDataProcessed = (data, actions, permissions) => {
  return data.map((item, index) => ({
    orden: (actions.page - 1) * 10 + (index + 1),
    name: item?.name || '',
    custom_id: item?.custom_id || '',
    email: item?.email || '',
    phone: item?.phone || '',
    contact: item?.contact || '',
    asesor: item?.asesor || '',
    subscription_status: item?.subscription_status || '',
    total_products: item?.total_products || 0,
    total_approved_products: item?.total_approved_products || 0,
    lastConnectionDate: item?.lastConnectionDate
      ? CVFormatDate({
          date: item?.lastConnectionDate,
          format: 'DD/MM/YYYY',
          time: true
        })
      : '-',
    actions: (
      <Flex>
        <Tooltip label='Editar'>
          {permissions.editar && (
            <Link
              style={{ margin: 'auto' }}
              target='_blank'
              to={{
                pathname: `/bo/clientes/${item.customer_id}/information`,
                state: { currentPage: actions.page } // Guardar el número de página actual
              }}>
              {svgEdit}
            </Link>
          )}
        </Tooltip>
        <SizeBox />
      </Flex>
    )
  }));
};

// Data columns of Table
export const columnsData = [
  {
    label: 'N°',
    data: 'orden',
    first: true,
    align: 'center'
  },
  {
    label: 'ID',
    data: 'custom_id'
  },
  {
    label: 'Nombre',
    data: 'name'
  },
  {
    label: 'Email',
    data: 'email'
  },
  {
    label: 'Telefono',
    data: 'phone'
  },
  {
    label: 'Representante Legal',
    data: 'contact'
  },
  {
    label: 'Asesor',
    data: 'asesor'
  },
  {
    label: 'Suscripción',
    data: 'subscription_status'
  },
  {
    label: 'Total de productos aprobados',
    data: 'total_approved_products',
    align: 'center'
  },
  {
    label: 'Total de productos',
    data: 'total_products',
    align: 'center'
  },
  {
    label: 'Fecha de última conexión',
    data: 'lastConnectionDate',
    align: 'center'
  },
  {
    label: 'Acciones',
    data: 'actions',
    align: 'center',
    last: true
  }
];
