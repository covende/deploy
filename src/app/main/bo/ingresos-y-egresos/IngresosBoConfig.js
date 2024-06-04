import React from 'react';
import { Redirect } from 'react-router-dom';

// dependencies
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const IngresosBoConfig = [
  {
    path: '/bo/ingresos-y-egresos/suscripciones',
    name: 'Suscripciones',
    component: React.lazy(() => import('./pages/IESuscripciones')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/ingresos-y-egresos/pedidos/procesados',
    name: 'Pedidos Procesados',
    component: React.lazy(() => import('./pages/IEPProcesados')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/ingresos-y-egresos/pedidos',
    name: 'Pedidos',
    component: React.lazy(() => import('./pages/IEPedidos')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  // {
  //   path: '/bo/ingresos-y-egresos/depositos/:custom_id_store/transaccion',
  //   name: 'Corte quincenal por Transacciones',
  //   component: React.lazy(() => import('./pages/IEDSTransaccion')),
  //   route: PrivateRoute,
  //   roles: GlobalRole,
  //   layout: Layout.Backoffice
  // },

  {
    path: '/bo/ingresos-y-egresos/depositos/:cut_code/transactions/:company_id',
    name: 'Corte quincenal por Transacciones',
    component: React.lazy(() => import('./pages/IEDSTransaccion')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/ingresos-y-egresos/depositos/:cut_code/transaciones',
    name: 'Corte quincenal por Transacciones',
    component: React.lazy(() => import('./pages/IEDSTransaccion')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },

  // {
  //   path: '/bo/ingresos-y-egresos/depositos/:custom_id_store/:date',
  //   name: 'Corte quincenal por tienda',
  //   component: React.lazy(() => import('./pages/IEDStore')),
  //   route: PrivateRoute,
  //   roles: GlobalRole,
  //   layout: Layout.Backoffice
  // },
  {
    path: '/bo/ingresos-y-egresos/depositos/:cut_code',
    name: 'Corte quincenal por tienda',
    component: React.lazy(() => import('./pages/IEDStore')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/ingresos-y-egresos/depositos',
    name: 'Depósitos',
    component: React.lazy(() => import('./pages/IEDepositos')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/ingresos-y-egresos/proveedores-y-partners',
    name: 'Proveedores & Partners',
    component: React.lazy(() => import('./pages/IEProveedoresPartners')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/ingresos-y-egresos/descuentos',
    name: 'Descuentos',
    component: React.lazy(() => import('./pages/IEDescuentos')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/ingresos-y-egresos/exceso-de-envio',
    name: 'Exceso de envío',
    component: React.lazy(() => import('./pages/IEExcessSend')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/ingresos-y-egresos',
    name: 'Ingresos y Egresos',
    component: React.lazy(() => import('./')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  }
];
