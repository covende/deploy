import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';
// import { Role as GlobalRole } from '@/app/helpers/role';

export const DocumentosCovendeConfig = [
  {
    path: '/Presentacion_comercial_covende',
    name: 'Presentación comercial Covende',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    // roles: GlobalRole,
    layout: Layout.CleanOut
  },
  {
    path: '/documentos/lista',
    name: 'lista Covende',
    component: React.lazy(() => import('./documents/listasdeenvio')),
    exact: true,
    route: Route,
    // roles: GlobalRole,
    layout: Layout.CleanOut
  }
];
