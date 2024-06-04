export const sideBarProtectedRoutes = [
  {
    path: '/bo/clientes',
    name: 'Clientes'
  },
  {
    path: '/bo/pedidos',
    name: 'Pedidos'
  },
  {
    path: '/bo/tarifas-y-comisiones',
    name: 'Tarifas y comisiones'
  },
  {
    path: '/bo/arborescencia-de-categorias',
    name: 'Arborescencia de categorías'
  },
  {
    path: '/bo/productos',
    name: 'Productos'
  },
  {
    path: '/bo/devoluciones',
    name: 'Devoluciones'
  },
  {
    path: '/bo/centro-de-mensajería',
    name: 'Centro de mensajería'
  },
  {
    path: '/bo/preguntas-frecuentes',
    name: 'FAQ'
  },
  {
    path: '/bo/estadisticas',
    name: 'Estadísticas'
  },
  {
    path: '/bo/usuarios',
    name: 'Usuarios'
  },
  {
    path: '/bo/roles',
    name: 'Roles'
  },
  {
    path: '/bo/logs',
    name: 'Logs'
  },
  {
    path: '/bo/centro-de-facturacion',
    name: 'Centro de facturación'
  },
  {
    path: '/bo/subastas',
    name: 'Subastas'
  },
  {
    path: '/bo/edicion-web-publica',
    name: 'Edición Web Pública',
    children: [
      {
        path: '/bo/edicion-web-publica/todas-las-ofertas',
        name: 'Todas las ofertas'
      },
      {
        path: '/bo/edicion-web-publica/gestion-slides-banners',
        name: 'Gestión Slides & Banners',
        children: [
          {
            path: '/bo/edicion-web-publica/gestion-slides-banners/banners-por-categoria',
            name: 'Banners por categoría'
          },
          {
            path: '/bo/edicion-web-publica/gestion-slides-banners/banners-home',
            name: 'Banners Home'
          },
          {
            path: '/bo/edicion-web-publica/gestion-slides-banners/banners-login',
            name: 'Banners Log-in'
          },
          {
            path: '/bo/edicion-web-publica/gestion-slides-banners/banners-crea-tu-tienda',
            name: 'Banners "Crea tu tienda"'
          },
          {
            path: '/bo/edicion-web-publica/gestion-slides-banners/banners-subastas',
            name: 'Banners Subastas'
          }
        ]
      },
      {
        path: '/bo/edicion-web-publica/paginas-del-footer',
        name: 'Páginas del Footer'
      },
      {
        path: '/bo/edicion-web-publica/subastas-en-linea',
        name: 'Subastas en Línea'
      },
      {
        path: '/bo/edicion-web-publica/categorias-de-subastas',
        name: 'Categorías de Subastas'
      },
      {
        path: '/bo/edicion-web-publica/productos-dentro-de-la-categoría',
        name: 'Productos dentro de la categoría'
      },
      {
        path: '/bo/edicion-web-publica/comentarios-y-calificaciones',
        name: 'Comentarios y Calificaciones'
      }
    ]
  },
  {
    path: '/bo/servicios-adicionales',
    name: 'Servicios adicionales'
  },
  {
    path: '/bo/cartera-de-clientes',
    name: 'Cartera de clientes'
  },
  {
    path: '/bo/datos-de-covende',
    name: 'Datos de Covende'
  },
  {
    path: '/bo/tablas',
    name: 'Tablas'
  },
  {
    path: '/bo/cupones',
    name: 'Cupones'
  },
  {
    path: '/bo/reembolso',
    name: 'Reembolso'
  },
  {
    path: '/bo/ingresos-y-egresos',
    name: 'Ingresos y Egresos',
    children: [
      { path: '/bo/ingresos-y-egresos/suscripciones', name: 'Suscripciones' },
      { path: '/bo/ingresos-y-egresos/pedidos', name: 'Pedidos' },
      { path: '/bo/ingresos-y-egresos/depositos', name: 'Depósitos' },
      {
        path: '/bo/ingresos-y-egresos/proveedores-y-partners',
        name: 'Proveedores & Partners'
      },
      { path: '/bo/ingresos-y-egresos/descuentos', name: 'Descuentos' }
    ]
  },
  {
    path: '/bo/menus',
    name: 'Menus'
  }
];
