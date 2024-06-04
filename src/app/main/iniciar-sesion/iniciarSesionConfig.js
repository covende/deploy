import React from 'react';
import { Route } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';

export const IniciarSesionConfig = [
  {
    path: '/iniciar-sesion',
    name: 'Iniciar sesión',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  }
];
