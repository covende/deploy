import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const BuscarConfig = [
  {
    path: '/productos-de-busqueda/:search',
    name: 'Productos de búsqueda',
    component: React.lazy(() => import('.')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  },
  {
    path: '/productos-de-busqueda',
    name: 'Productos de búsqueda',
    component: React.lazy(() => import('.')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  }
];
