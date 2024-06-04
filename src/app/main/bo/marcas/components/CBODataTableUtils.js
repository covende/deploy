import CVSelect from '@CVTemplate/core/CVSelect';
import React from 'react';

export const marcasHeaders = ({ filtro, setfiltro }) => [
  { label: 'N°', data: 'numero', first: true, align: 'center' },
  { label: 'Nombre', data: 'name', align: 'center' },
  { label: 'Logo', data: 'logo', align: 'center' },
  {
    label: (
      <CVSelect
        color='white'
        options={[
          { text: 'Tipo', value: 'none', disabled: true },
          { text: 'Registrado', value: 'REGISTERED' },
          { text: 'Propio', value: 'OWN' },
          { text: 'Todo', value: 'ALL' }
        ]}
        value={filtro.type_brand}
        onChange={(value) => setfiltro({ ...filtro, type_brand: value })}
      />
    ),
    data: 'type_brand',
    align: 'center'
  },
  {
    label: (
      <CVSelect
        color='white'
        options={[
          { text: 'Activo', value: 'none', disabled: true },
          { text: 'Si', value: 'SI' },
          { text: 'No', value: 'NO' },
          { text: 'Todo', value: 'ALL' }
        ]}
        value={filtro.active}
        onChange={(value) => setfiltro({ ...filtro, active: value })}
      />
    ),
    data: 'active',
    align: 'center'
  },
  { label: 'Acciones', data: 'acciones', align: 'center', last: true }
];

export const solicitudesMarcasHeaders = ({ filtro, setfiltro }) => [
  { label: 'N°', data: 'numero', first: true, align: 'center' },
  { label: 'Nombre', data: 'name', align: 'center' },
  { label: 'Patentada', data: 'patented_brand', align: 'center' },
  { label: 'Logo', data: 'logo', align: 'center' },
  { label: 'Lugar de venta', data: 'place', align: 'center' },
  { label: 'Tienda', data: 'store', align: 'center' },
  { label: 'Fecha de solicitud', data: 'createdAt', align: 'center' },
  {
    label: (
      <CVSelect
        color='white'
        options={[
          { text: 'Estado', value: 'none', disabled: true },
          { text: 'Pendiente', value: 'PENDING' },
          { text: 'Aprobado', value: 'APPROVED' },
          { text: 'Rechazado', value: 'REJECTED' },
          { text: 'Todo', value: 'ALL' }
        ]}
        value={filtro.status}
        onChange={(value) => setfiltro({ ...filtro, status: value })}
      />
    ),
    data: 'status',
    align: 'center'
  },
  { label: 'Acciones', data: 'acciones', align: 'center', last: true }
];

export const solicitudesMarcasStatus = {
  PENDING: {
    value: 'PENDING',
    text: 'Pendiente',
    color: 'gray'
  },
  APPROVED: {
    value: 'APPROVED',
    text: 'Aprobado',
    color: 'primary'
  },
  REJECTED: {
    value: 'REJECTED',
    text: 'Rechazado',
    color: 'red'
  }
};

export const solicitudesMarcasPlaces = {
  BODEGAS: 'Bodegas',
  ONLINE: 'Venta Online',
  SUPERMERCADOS: 'Supermercados'
};

export const brandClean = {
  brand_id: '',
  name: '',
  store_id: '',
  image: '',
  type_brand: '',
  flag_active: true
};
