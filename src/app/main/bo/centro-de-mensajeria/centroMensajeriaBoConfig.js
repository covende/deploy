import React from 'react';
import { Redirect } from 'react-router-dom';

// dependencies
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const CentroMensajeriaBoConfig = [
  {
    path: '/bo/centro-de-mensajeria',
    name: 'Centro de mensajería',
    component: React.lazy(() => import('./')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  }
];
