import React from 'react';
import { Redirect } from 'react-router-dom';

// dependencies
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const ProductosBoConfig = [
  {
    path: '/bo/productos/rejected',
    name: 'Motivos de Rechazo',
    component: React.lazy(() => import('./components/Rejected')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/productos/:product_id/:store_id/verifica',
    name: 'Verificar Producto',
    component: React.lazy(() => import('./components/ProductVerify')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/productos',
    name: 'Productos',
    component: React.lazy(() => import('./')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  }
];
