import React from 'react';
import { PrivateRoute } from '@/common/routes/PrivateRoute';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const SellerFacturacionConfig = [
  {
    path: '/seller/facturacion',
    name: 'Facturacion',
    component: React.lazy(() => import('./index')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  }
];
