import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const CarritoComprasConfig = [
  {
    path: '/checkout/:data',
    name: 'Pagar Carrito de compras',
    component: React.lazy(() => import('./Checkout.js')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  },
  {
    path: '/carrito-de-compras',
    name: 'Carrito de compras',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  }
];
