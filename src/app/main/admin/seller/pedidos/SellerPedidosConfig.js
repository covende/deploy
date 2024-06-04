import React from 'react';
import { PrivateRoute } from '@/common/routes/PrivateRoute';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const SellerPedidosConfig = [
  {
    path: '/seller/pedidos',
    name: 'Pedidos',
    component: React.lazy(() => import('./index')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  }
];
