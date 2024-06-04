import React from 'react';

// UI components
import { CardImage } from '@/common/components';

// Assets
import { svgEdit, svgDelete } from '@/app/assets/images/SVG';
import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import { CVImage } from '@/common/CovendeTemplate';

// Helpers

const inputDataProcessed = (data, actions, state, webPublicaPermisions) => {
  let count = 0;
  return data.map((item, index) => {
    count = index + 1;
    count = count.toString();
    return {
      orden: count.padStart(2, '0'),
      image: <CVImage image={item.image} height='50px' width='auto' />,
      description: item.description,
      createdAt: (
        <div style={{ width: '96px', margin: 'auto' }}>
          {CVFormatDate({ date: item.createdAt })}
        </div>
      ),
      updatedAt: (
        <div style={{ width: '96px', margin: 'auto' }}>
          {CVFormatDate({ date: item.updatedAt })}
        </div>
      ),
      actions: (
        <div style={{ display: 'flex' }}>
          {webPublicaPermisions.editar && (
            <a onClick={() => actions.edit(item)}>{svgEdit}</a>
          )}{' '}
          &nbsp;&nbsp;│&nbsp;&nbsp;
          {webPublicaPermisions.eliminar && (
            <a onClick={() => actions.delete(item)}>{svgDelete}</a>
          )}
        </div>
      )
    };
  });
};

export const columnsData = [
  {
    label: 'N°',
    data: 'orden',
    first: true
  },
  {
    label: 'Imagen',
    data: 'image'
  },
  {
    label: 'Descripción',
    data: 'description'
  },
  {
    label: 'Fec. creación',
    data: 'createdAt'
  },
  {
    label: 'Fec. edición',
    data: 'updatedAt'
  },
  {
    label: 'Acciones',
    data: 'actions',
    last: true
  }
];

export default {
  inputDataProcessed,
  columnsData
};
