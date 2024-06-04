import React from 'react';

// UI components
import { CardImage } from '@/common/components';

// Assets
import { svgEdit, svgDelete } from '@/app/assets/images/SVG';

import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import { CVImage } from '@/common/CovendeTemplate';

const inputDataProcessed = (data, actions, webPublicaPermisions) => {
  let count = 0;
  return data.map((item, index) => {
    count = index + 1;
    count = count.toString();
    return {
      orden: count.padStart(2, '0'),
      image: <CVImage image={item.image} height='50px' width='auto' />,
      title: item.title,
      description: item.description,
      createdAt: webPublicaPermisions.crear && (
        <div style={{ width: '96px', margin: 'auto' }}>
          {CVFormatDate({ date: item.createdAt, format: 'DD/MM/YYYY' })}
        </div>
      ),
      updatedAt: webPublicaPermisions.actualizar && (
        <div style={{ width: '96px', margin: 'auto' }}>
          {CVFormatDate({ date: item.updatedAt, format: 'DD/MM/YYYY' })}
        </div>
      ),
      actions: webPublicaPermisions.eliminar && (
        <div style={{ display: 'flex' }}>
          <a onClick={() => actions.edit(item)}>{svgEdit}</a>{' '}
          &nbsp;&nbsp;│&nbsp;&nbsp;
          <a onClick={() => actions.delete(item)}>{svgDelete}</a>
        </div>
      )
    };
  });
};

export const columnsData = [
  {
    label: 'N°',
    data: 'orden',
    first: true,
    align: 'center'
  },
  {
    label: 'Imagen',
    data: 'image'
  },
  {
    label: 'Título',
    data: 'title'
  },
  {
    label: 'Descripción',
    data: 'description'
  },
  {
    label: 'Fec. creación',
    data: 'createdAt',
    width: 20
  },
  {
    label: 'Fec. edición',
    data: 'updatedAt',
    width: 20
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
