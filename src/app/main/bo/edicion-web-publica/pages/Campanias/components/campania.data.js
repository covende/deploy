import React from 'react';
import { PencilAltIcon, Trash } from '@/app/assets/icons/index';
import { Flex, Button } from '@chakra-ui/react/';
import { CVDateFormat } from '@CVPages/core/admin/seller/estadisticas/components/MVendidosUtils';

export const HeaderCampania = [
  { data: '_id', label: 'ID', first: true },
  { data: 'email', label: 'Email' },
  { data: 'createdAt', label: 'Fecha de Creación' },
  { data: 'updatedAt', label: 'Fecha de Actualización' },
  { data: 'actions', label: 'Acciones', last: true }
];

export const DataCampania = (list, actions) => {
  return list.map((item) => {
    return {
      _id: item._id || '',
      email: item.email || '',
      createdAt: CVDateFormat(new Date(item.createdAt)),
      updatedAt: CVDateFormat(new Date(item.updatedAt)),
      actions: (
        <Flex>
          <Button
            variant='link'
            onClick={() => actions.edit(item._id, item.email)}>
            {PencilAltIcon}
          </Button>
          <Button variant='link' onClick={() => actions.deleteEmail(item._id)}>
            {Trash}
          </Button>
        </Flex>
      )
    };
  });
};
