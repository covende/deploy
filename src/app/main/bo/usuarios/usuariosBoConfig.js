import React from 'react';
import { Redirect } from 'react-router-dom';

// dependencies
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const UsuariosBoConfig = [
  {
    path: '/bo/usuarios/ficha-de-datos',
    name: 'Ficha de datos',
    component: React.lazy(() => import('./ficha-de-datos')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/usuarios',
    name: 'Usuarios',
    component: React.lazy(() => import('./')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  }
  //   {
  //     path: '/apps/e-commerce/products/:productId/:productHandle?',
  //     component: React.lazy(() => import('./product/Product')),
  //   },
  //   {
  //     path: '/apps/e-commerce/products',
  //     component: React.lazy(() => import('./products/Products')),
  //   },
  //   {
  //     path: '/apps/e-commerce/orders/:orderId',
  //     component: React.lazy(() => import('./order/Order')),
  //   },
  //   {
  //     path: '/apps/e-commerce/orders',
  //     component: React.lazy(() => import('./orders/Orders')),
  //   },
  //   {
  //     path: '/apps/e-commerce',
  //     component: () => <Redirect to='/apps/e-commerce/products' />,
  //   },
];
