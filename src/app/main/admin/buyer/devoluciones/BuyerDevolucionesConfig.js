import React from 'react';
import { PrivateRoute } from '@/common/routes/PrivateRoute';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const BuyerDevolucionesConfig = [
  {
    path: '/buyer/devoluciones/:pedido_id/:devolucion_id/:method',
    name: 'Devoluciones',
    component: React.lazy(() => import('./components/DVForm')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/buyer/reembolso/:provenace/:pedido_id',
    name: 'reembolso',
    component: React.lazy(() => import('./reembolso/BuyerReembolso')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/buyer/devoluciones',
    name: 'Devoluciones',
    component: React.lazy(() => import('.')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  }
];
