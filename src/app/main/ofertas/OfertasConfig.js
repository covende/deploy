import React from 'react';
import { Route } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const OfertasConfig = [
  {
    path: '/ofertas',
    name: 'Ofertas Covende',
    component: React.lazy(() => import('.')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  }
];
