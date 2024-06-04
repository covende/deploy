import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// dependencies
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const WishListConfig = [
  {
    path: '/wish-list',
    name: 'lista de deseos',
    component: React.lazy(() => import('./')),
    exact: true,
    route: Route,
    roles: GlobalRole,
    layout: Layout.WebPublic
  }
];
