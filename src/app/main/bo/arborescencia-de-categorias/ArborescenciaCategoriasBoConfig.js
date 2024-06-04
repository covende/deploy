import React from 'react';
import { Redirect } from 'react-router-dom';

// dependencies
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const ArborescenciaCategoriasBoConfig = [
  {
    path: '/bo/arborescencia-de-categorias/tiendas',
    name: 'Tiendas',
    component: React.lazy(() => import('./components/companies')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/arborescencia-de-categorias',
    name: 'Arborescencia de categorías',
    component: React.lazy(() => import('./')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  }
];
