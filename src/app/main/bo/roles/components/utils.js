import React from 'react';

// Assets
import { svgEdit, svgDelete } from '@/app/assets/images/SVG';

const findMenu = (permissions, permissionID) =>
  permissions.find((p) => p.permission_id === permissionID);

const notFilterPermissionID = (permissions, permissionID) =>
  permissions.filter((p) => p.permission_id !== permissionID);

const inputDataProcessed = (data, actions, RolesPermisions) =>
  data.map((item, index) => ({
    orden: index + 1,
    name: item.roleName,
    description: item.description,
    actions: (
      <div
        style={{
          display: 'flex',
          margin: 'auto',
          width: 'max-content',
          gridGap: '10px'
        }}>
        <a onClick={() => actions.edit(item)}>{svgEdit}</a> &nbsp;│&nbsp;
        {RolesPermisions.eliminar && (
          <a onClick={() => actions.delete(item)}>{svgDelete}</a>
        )}
      </div>
    )
  }));

const modalDataProcessed = (data, handleChange, refs) => {
  let count = 0;
  return data.map((item, index) => {
    count = index + 1;
    count = count.toString();
    return {
      orden: count.padStart(2, '0'),
      name: item.guard_name,
      read: (
        <input
          type='checkbox'
          name={`read-${item.permission_id}`}
          ref={refs}
          checked={item.read}
          onChange={(e) => handleChange(e)}
        />
      ),
      add: (
        <input
          type='checkbox'
          name={`add-${item.permission_id}`}
          ref={refs}
          checked={item.add}
          onChange={(e) => handleChange(e)}
        />
      ),
      edit: (
        <input
          type='checkbox'
          name={`edit-${item.permission_id}`}
          ref={refs}
          checked={item.edit}
          onChange={(e) => handleChange(e)}
        />
      ),
      delete: (
        <input
          type='checkbox'
          name={`delete-${item.permission_id}`}
          ref={refs}
          checked={item.delete}
          onChange={(e) => handleChange(e)}
        />
      )
    };
  });
};

const columnsData = [
  {
    label: 'N°',
    data: 'orden',
    first: true
  },
  {
    label: 'Rol',
    data: 'name'
  },
  {
    label: 'Descripción',
    data: 'description'
  },
  {
    label: 'Acción',
    data: 'actions',
    last: true
  }
];

const columnsModalData = [
  {
    label: 'N°',
    data: 'orden',
    first: true
  },
  {
    label: 'Menu',
    data: 'name'
  },
  {
    label: 'Ver',
    data: 'read'
  },
  {
    label: 'Crear',
    data: 'add'
  },
  {
    label: 'Editar',
    data: 'edit'
  },
  {
    label: 'Eliminar',
    data: 'delete',
    last: true
  }
];

export default {
  findMenu,
  notFilterPermissionID,
  inputDataProcessed,
  modalDataProcessed,
  columnsData,
  columnsModalData
};
