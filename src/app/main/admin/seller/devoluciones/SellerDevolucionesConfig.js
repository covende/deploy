import React from 'react';
import { PrivateRoute } from '@/common/routes/PrivateRoute';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const SellerDevolucionesConfig = [
  {
    path: '/seller/devoluciones/:pedido_id/:devolucion_id/:method',
    name: 'Devoluciones',
    component: React.lazy(() => import('./components/DevolucionProcesa')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/seller/devoluciones',
    name: 'Devoluciones',
    component: React.lazy(() => import('./index')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  }
  
];
