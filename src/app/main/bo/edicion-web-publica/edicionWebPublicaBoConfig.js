import React from 'react';
import { Redirect } from 'react-router-dom';

// dependencies
import { PrivateRoute } from '@/common/routes/PrivateRoute';
import Layout from '@/app/layouts';
import { Role as GlobalRole } from '@/app/helpers/role';

export const EdicionWebPublicaBoConfig = [
  {
    path: '/bo/edicion-web-publica/todas-las-ofertas',
    name: 'Edición Web Pública / Todas las ofertas',
    component: React.lazy(() => import('./pages/Ofertas')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/gestion-slides-banners/banners-por-categoria',
    name: 'Edición Web Pública / Gestión Slides & Banners / Por Categorías',
    component: React.lazy(() =>
      import('./pages/GestionSlidesBanners/BannerCategoria')
    ),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/gestion-slides-banners/banners-home',
    name: 'Edición Web Pública / Gestión Slides & Banners',
    component: React.lazy(() =>
      import('./pages/GestionSlidesBanners/BannerHome')
    ),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/gestion-slides-banners/banners-login',
    name: 'Edición Web Pública / Gestión Slides & Banners / Login',
    component: React.lazy(() =>
      import('./pages/GestionSlidesBanners/BannerLogin')
    ),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/gestion-slides-banners/banners-crea-tu-tienda',
    name: 'Edición Web Pública / Gestión Slides & Banners / Crea tu tienda',
    component: React.lazy(() =>
      import('./pages/GestionSlidesBanners/BannerCreaTienda')
    ),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/gestion-slides-banners/banners-subastas',
    name: 'Edición Web Pública / Gestión Slides & Banners / Subastas',
    component: React.lazy(() =>
      import('./pages/GestionSlidesBanners/BannerSubasta')
    ),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/paginas-del-footer',
    name: 'Edición Web Pública / Páginas del Footer',
    component: React.lazy(() => import('./pages/PaginasFooter')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/subastas-en-linea',
    name: 'Edición Web Pública / Subastas en Línea',
    component: React.lazy(() => import('./pages/Subastas')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/campanas',
    name: 'Edición Web Pública / Campañas',
    component: React.lazy(() => import('./pages/Campanias')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/categorias-de-subastas',
    name: 'Edición Web Pública / Categorías de Subastas',
    component: React.lazy(() => import('./pages/SubastasCategorias')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/productos-dentro-de-la-categoria',
    name: 'Edición Web Pública / Productos dentro de la categoría',
    component: React.lazy(() => import('./pages/ProductosCategoria')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/comentarios-y-calificaciones',
    name: 'Edición Web Pública / Comentarios y Calificaciones',
    component: React.lazy(() => import('./pages/ComentariosCalificaciones')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
  {
    path: '/bo/edicion-web-publica/terminos-y-condiciones',
    name: 'Edición Web Pública / terminos y condiciones',
    component: React.lazy(() => import('./pages/Terminos')),
    route: PrivateRoute,
    roles: GlobalRole,
    layout: Layout.Backoffice
  },
];
