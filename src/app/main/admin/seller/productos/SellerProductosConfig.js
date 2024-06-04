import React from 'react';
import { PrivateRoute } from '@/common/routes/PrivateRoute';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const SellerProductosConfig = [
  {
    path: '/seller/productos/:action/:id/step/:step',
    name: 'Producto',
    component: React.lazy(() => import('./AddProducts')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/seller/productos/attributes',
    name: 'Abributos',
    component: React.lazy(() => import('./AttrProducts')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/seller/productos/carga',
    name: 'Carga Masiva',
    component: React.lazy(() => import('./CargaMasiva')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/seller/productos',
    name: 'Productos',
    component: React.lazy(() => import('./index')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  }
];
