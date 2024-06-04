import React from 'react';
import { PrivateRoute } from '@/common/routes/PrivateRoute';

import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const SellerPlanesConfig = [
  {
    path: '/seller/planes',
    name: 'Planes',
    component: React.lazy(() => import('./index')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/seller/listado_plan',
    name: 'Listado Plan',
    component: React.lazy(() => import('./ListadoPlan')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/seller/seleccionar_plan',
    name: 'Seleccionar Plan',
    component: React.lazy(() => import('./SelectPlan')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },
  {
    path: '/seller/pay_plan/:plan',
    name: 'Pagar Plan',
    component: React.lazy(() => import('./PayPlan')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  },

  {
    path: '/seller/cancelar',
    name: 'Eliminar Plan',
    component: React.lazy(() => import('./components/SubscriptionCancel')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.BuyerSeller
  }
];
