import React from 'react';
import { PrivateRoute } from '@/common/routes/PrivateRoute';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const SellerConfiguracionConfig = [
  {
    path: '/seller/configuracion/subcuentas',
    name: 'Subcuentas',
    component: React.lazy(() => import('./components/tab1/MiSubcuenta')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/seller/configuracion',
    name: 'Configuracion',
    component: React.lazy(() => import('./index')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  }
];
