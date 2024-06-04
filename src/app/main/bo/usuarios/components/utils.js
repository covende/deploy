import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@chakra-ui/react';
import { Eye } from '@/app/assets/icons';
import { CVFormatDate } from '@/common/CovendeTemplate/CVMethods';
import { CVImage, CVText } from '@/common/CovendeTemplate';
import { HiUserCircle } from 'react-icons/hi';
import { svgEdit } from '@/app/assets/images/SVG';

const inputDataProcessed = (data, actions, UserPermisions) =>
  data.map((item) => ({
    orden: item.orden,
    image: (
      <CVImage
        width='50px'
        height='50px'
        image={item.image}
        name={item.first_name || item.last_name || '-'}
      />
    ),
    custom_id: item.custom_id || '',
    name:
      item.first_name || item.last_name
        ? item.first_name + ' ' + item.last_name
        : '-',
    role: (
      <CVText fontWeight='bold' color='blue'>
        {item.role ? item.role.name : '-'}
      </CVText>
    ),
    user_id: item.user_id,
    status: item.flag_active ? 'Habilitado' : 'Deshabilitado',
    createdAt: (
      <div style={{ width: '96px', margin: 'auto' }}>
        {CVFormatDate({ date: item.createdAt })}
      </div>
    ),
    actions: (
      <div style={{ display: 'flex' }}>
        {UserPermisions.editar && (
          <Link
            to={{
              pathname: '/bo/usuarios/ficha-de-datos',
              state: { user: item }
            }}>
            {svgEdit}
          </Link>
        )}
        &nbsp;&nbsp;│&nbsp;&nbsp;
        {UserPermisions.eliminar && actions.delete(item)}
      </div>
    )
  }));

const CellImage = ({ value }) =>
  value ? (
    <CVImage width='64px' height='64px' variant='avatar' image={value} />
  ) : (
    <HiUserCircle style={{ fontSize: '2rem' }} />
  );

const CellStatus = ({ value }) => (
  <Badge
    px='8px'
    py='4px'
    borderRadius='4px'
    color='white'
    bg={
      value === 'Habilitado' ? 'covende.success.main' : 'covende.secondary.main'
    }>
    {value}
  </Badge>
);

const columnsData = [
  {
    label: 'N°',
    data: 'orden',
    first: true,
    align: 'center'
  },
  {
    label: 'Foto de Perfil',
    width: '20',
    data: 'image',
    Cell: ({ cell: { value } }) => <CellImage value={value} />
  },
  {
    label: 'Nombre completo',
    data: 'name'
  },
  {
    label: 'Roles',
    data: 'role'
  },
  {
    label: 'ID USUARIO',
    data: 'custom_id'
  },
  {
    label: 'Estado',
    data: 'status',
    Cell: ({ cell: { value } }) => <CellStatus value={value} />
  },
  {
    label: 'Fecha de inicio',
    data: 'createdAt'
  },
  {
    label: 'Acción',
    data: 'actions',
    last: true
  }
];

export default {
  inputDataProcessed,
  columnsData
};
