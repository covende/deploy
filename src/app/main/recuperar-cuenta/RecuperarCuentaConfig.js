import React from 'react';
import { Route } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';

export const RecuperarCuentaConfig = [
  {
    path: '/recuperar-cuenta',
    name: 'Registrar cuenta',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  },
  {
    path: '/reset/:data',
    name: 'Registrar cuenta',
    component: React.lazy(() => import('./RestablecerCuenta')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  },
  {
    path: '/restablecido',
    name: 'Registrar cuenta',
    component: React.lazy(() => import('./Restablecido')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  }
];
