import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// dependencies
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const IniciarSesionBoConfig = [
  {
    path: '/bo/iniciar-sesion',
    name: 'Backoffice Iniciar sesión',
    component: React.lazy(() => import('./')),
    // exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.AuthBackoffice
  }
];
