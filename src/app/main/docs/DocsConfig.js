import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const DocsConfig = [
  {
    path: '/pedido-guia/:guide',
    name: 'Guia de Entrega de Pedido',
    component: React.lazy(() => import('./PedidoGuia')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  },
  {
    path: '/devolucion-guia/:guide',
    name: 'Guia de Entrega de Devolucion',
    component: React.lazy(() => import('./DevolutionGuia')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  },
  {
    path: '/devolucion-guia/',
    name: 'Guia de Entrega de Devolucion',
    component: React.lazy(() => import('./DevolutionGuia')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  }
];
