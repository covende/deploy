import React from 'react';
import { PrivateRoute } from '@/common/routes/PrivateRoute';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const BuyerPedidosConfig = [
  {
    path: '/buyer/pedidos/detalle/:id',
    name: 'Detalle de Pedido',
    component: React.lazy(() => import('./BuyerPedidosDetalles')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/buyer/pedidos',
    name: 'Pedidos',
    component: React.lazy(() => import('.')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  }
];
