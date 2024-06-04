import React from 'react';
import { PrivateRoute } from '@/common/routes/PrivateRoute';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const BuyerConfiguracionConfig = [
  {
    path: '/buyer/configuracion',
    name: 'Configuracion',
    component: React.lazy(() => import('.')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  }
];
