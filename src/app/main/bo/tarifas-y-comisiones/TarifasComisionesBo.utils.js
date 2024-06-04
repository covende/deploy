import React from 'react';
import { Link } from 'react-router-dom';

// Assets
import { PencilAltIcon, Trash } from '@/app/assets/icons';
import { Button } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/react';
const inputDataFeedsProcessed = (
  data = [],
  actions,
  permisions = { editar: true }
) => {
  return (
    data &&
    data.map((item, index) => ({
      index: index + 1,
      feed_description: item.name,
      feed_price: 'S/ ' + item.price,
      periodo: item.periodo + ' meses',
      actions: (
        <Flex>
          {permisions.editar && (
            <Button variant='link' onClick={() => actions.editarplanes(item)}>
              {PencilAltIcon}
            </Button>
          )}
          {permisions.eliminar && (
            <Button variant='link' onClick={() => actions.deleteplanes(item)}>
              {Trash}
            </Button>
          )}
        </Flex>
      )
    }))
  );
};

const columnsDataFeeds = [
  {
    label: 'N°',
    data: 'index',
    align: 'center',
    first: true
  },
  {
    label: 'DESCRIPCIÓN',
    data: 'feed_description'
  },
  {
    label: 'PRECIO',
    data: 'feed_price'
  },
  {
    label: 'PERIODO',
    data: 'periodo'
  },
  {
    label: 'ACCIÓN',
    data: 'actions',
    last: true
  }
];

const inputDataCommissionsProcessed = (
  data,
  actions,
  permisions = { editar: true }
) =>
  data.map((item, index) => ({
    index: index + 1,
    commission_category: item.commission_category,
    commission_subcatergory: item.commission_subcatergory,
    commission_fixed: item.commission_fixed,
    commission_percentage: item.commission_percentage,
    actions: permisions.editar && (
      <Link
        style={{ margin: 'auto' }}
        // onClick={() => actions.selected(item.customer_id)}
        to={'#'}>
        {PencilAltIcon}
      </Link>
    )
  }));
const columnsDataCommissions = [
  {
    label: 'N°',
    data: 'index'
  },
  {
    label: 'CATEGORÍA',
    data: 'commission_category'
  },
  {
    label: 'SUBCATEGORÍA',
    data: 'commission_subcatergory'
  },
  {
    label: 'COMISIÓN FIJA (S/)',
    data: 'commission_fixed'
  },
  {
    label: 'COMISIÓN VARIABLE (%)',
    data: 'commission_percentage'
  },
  {
    label: 'ACCIÓN',
    data: 'actions'
  }
];

export default {
  inputDataFeedsProcessed,
  columnsDataFeeds,
  inputDataCommissionsProcessed,
  columnsDataCommissions
};
