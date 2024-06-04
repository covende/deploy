import React from 'react';

// dependencies
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const DatosCovendeBoConfig = [
  {
    path: '/bo/datos-de-covende',
    name: 'Datos de covende',
    component: React.lazy(() => import('./')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  }
];
