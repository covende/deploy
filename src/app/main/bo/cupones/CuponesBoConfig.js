import React from 'react';
import { Redirect } from 'react-router-dom';

// dependencies
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const CuponesBoConfig = [
  {
    path: '/bo/cupones/usados',
    name: 'Cupones usados',
    component: React.lazy(() => import('./CuponesBoUsados')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/cupones/:id',
    name: 'Datos de Cupon',
    component: React.lazy(() => import('./CuponesBoForm')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/cupones',
    name: 'Cupones',
    component: React.lazy(() => import('.')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  }
];
