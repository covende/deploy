import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const TiendaConfig = [
  {
    path: '/tienda-oficiales/:id_category',
    name: 'Tienda',
    component: React.lazy(() => import('./TiendasOficiales/TiendasOficiales')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  },
  {
    path: '/tienda/:id/:slug/:tab',
    name: 'Tienda',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  },
  {
    path: '/tienda-reportes/:id',
    name: 'Tienda',
    component: React.lazy(() => import('./TiendaReport')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  },
  {
    path: '/tienda-opinions/:id',
    name: 'Tienda',
    component: React.lazy(() => import('./TiendaComment')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  },
  {
    path: '/tienda/:id/:slug',
    name: 'Tienda',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  },
  {
    path: '/tienda/:id',
    name: 'Tienda',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  }
];
