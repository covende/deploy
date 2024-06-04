import React from 'react';
import { Route } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';

export const CreaTuTiendaConfig = [
  {
    path: '/crea-tu-tienda/plan-description/:data',
    name: 'Crear tienda',
    component: React.lazy(() => import('./plan-description')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  },
  {
    path: '/crea-tu-tienda/tarifas-y-comisiones',
    name: 'Crear tienda',
    component: React.lazy(() => import('./tarifas-y-comisiones')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  },

  {
    path: '/crea-tu-tienda/:tabs/:user_id/:store_id',
    name: 'Crear tienda Pagar Suscripción',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  },
  {
    path: '/crea-tu-tienda/:tabs/:user_id',
    name: 'Crear tienda',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  },
  {
    path: '/crea-tu-tienda/:tabs',
    name: 'Crear tienda Usuario',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  },
  {
    path: '/crea-tu-tienda',
    name: 'Crear tienda',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    layout: Layout.AuthBuyerSeller
  }
];
