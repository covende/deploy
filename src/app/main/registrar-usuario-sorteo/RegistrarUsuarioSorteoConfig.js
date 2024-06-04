import React from 'react';
import { Route } from 'react-router-dom';

// dependencies
 import Layout from '@/app/layouts';

export const RegistrarUsuarioSorteoConfig = [
  {
    path: '/RegistroSorteo',
    name: 'Registrar usuario sorteo',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    layout: Layout.CleanOut,
  }
];
