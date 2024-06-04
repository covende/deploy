import React from 'react';
import { Route } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';

export const VerificarCuentaConfig = [
  {
    path: '/verificar/:code',
    name: 'Verificar',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  },
  {
    path: '/verificar',
    name: 'Verificar',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  }
];
