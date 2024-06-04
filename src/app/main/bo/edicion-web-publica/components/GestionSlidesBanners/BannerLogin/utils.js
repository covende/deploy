import React from 'react';
// Assets
import { svgEdit, svgDelete } from '@/app/assets/images/SVG';

// Helpers
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
    data: 'orden'
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
    data: 'createdAt'
  },
  {
    label: 'Fec. edición',
    data: 'updatedAt'
  },
  {
    label: 'Acciones',
    data: 'actions'
  }
];

export default {
  inputDataProcessed,
  columnsData
};
