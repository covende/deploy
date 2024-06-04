import React from 'react';
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import { Redirect } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const NotificacionesAdminConfig = [
  {
    path: '/:user/notificaciones',
    name: '> Notificaciones',
    component: React.lazy(() => import('./')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  }
];
