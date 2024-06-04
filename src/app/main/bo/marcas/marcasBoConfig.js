import React from 'react';
import { Redirect } from 'react-router-dom';

// dependencies
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const MarcasBoConfig = [
  {
    path: '/bo/marcas/solicitudes',
    name: 'solicitudes',
    component: React.lazy(() => import('./MarcasBoSolicitudes')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/marcas',
    name: 'marcas',
    component: React.lazy(() => import('./')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  }
];
