import React from 'react';
import { PrivateRoute } from '@/common/routes/PrivateRoute';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const BuyerCotizacionConfig = [
  {
    path: '/buyer/cotizacion/:idquotation',
    name: 'Cotizacion',
    component: React.lazy(() => import('./BuyerCotizacionDetails')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/buyer/cotizacion',
    name: 'Cotizaciones Solicitadas',
    component: React.lazy(() => import('./BuyerCotizacion')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  }
];
