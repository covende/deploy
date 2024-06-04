import React from 'react';
import { Redirect } from 'react-router-dom';

// dependencies
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const ClientesBoConfig = [
  {
    path: '/bo/clientes/informacion/:idcustomer/:tab',
    name: 'Información',
    component: React.lazy(() => import('./informacion')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/clientes/pedidos/:idcustomer/:tab',
    name: 'Pedidos',
    component: React.lazy(() => import('./pedidos')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/clientes/tarifas-y-comisiones/:idcustomer/:tab',
    name: 'Tarifas y comisiones',
    component: React.lazy(() => import('./tarifas-y-comisiones')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/clientes/facturas/:idcustomer/:tab',
    name: 'Facturas',
    component: React.lazy(() => import('./facturas')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/clientes/devoluciones/:idcustomer/:tab',
    name: 'Devoluciones',
    component: React.lazy(() => import('./devoluciones')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  //   {
  //     path: '/bo/clientes/productos',
  //     name: 'Productos',
  //     component: React.lazy(() => import('./pedidos/Pedidos')),
  //     route: PrivateRoute,
  //     roles: GlobalRole,
  //     layout: Layout.Backoffice,
  //   },
  //   {
  //     path: '/bo/clientes/calificaciones',
  //     name: 'Calificaciones',
  //     component: React.lazy(() => import('./pedidos/Pedidos')),
  //     route: PrivateRoute,
  //     roles: GlobalRole,
  //     layout: Layout.Backoffice,
  //   },
  {
    path: '/bo/clientes/:idcustomer/:tab',
    name: 'Clientes',
    component: React.lazy(() => import('./components/CustomerOverview')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/clientes',
    name: 'Clientes',
    component: React.lazy(() => import('./')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  }

  //   {
  //     path: '/apps/e-commerce/products/:productId/:productHandle?',
  //     component: React.lazy(() => import('./product/Product')),
  //   },
  //   {
  //     path: '/apps/e-commerce/products',
  //     component: React.lazy(() => import('./products/Products')),
  //   },
  //   {
  //     path: '/apps/e-commerce/orders/:orderId',
  //     component: React.lazy(() => import('./order/Order')),
  //   },
  //   {
  //     path: '/apps/e-commerce/orders',
  //     component: React.lazy(() => import('./orders/Orders')),
  //   },
  //   {
  //     path: '/apps/e-commerce',
  //     component: () => <Redirect to='/apps/e-commerce/products' />,
  //   },
];
