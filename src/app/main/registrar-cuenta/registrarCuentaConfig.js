import React from 'react';
import { Route } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';

export const RegistrarCuentaConfig = [
  {
    path: '/registrar-cuenta',
    name: 'Registrar cuenta',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  }
];
