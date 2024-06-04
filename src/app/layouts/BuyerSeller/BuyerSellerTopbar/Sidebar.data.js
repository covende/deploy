import { rolemenu } from '@/app/helpers/role';
import { COLORS } from '@CVTemplate/core/CVThemes';
import React from 'react';
import { BiCog, BiHelpCircle, BiStore } from 'react-icons/bi';
import {
  BsBarChart,
  BsBoxSeam,
  BsCart3,
  BsListTask,
  BsMegaphone,
  BsClipboardCheck
} from 'react-icons/bs';
import { GiHouse, GiDiplodocus } from 'react-icons/gi';
import { IoIosSync } from 'react-icons/io';
import { MdOutlineInventory2 } from 'react-icons/md';

export const typeUsers = [
  {
    color: COLORS['primary'],
    title: 'Vendedor',
    disabled: () => rolemenu() == '/buyer',
    type: 'Vender',
    icon: <BiStore style={{ fontSize: '3rem' }} />,
    tooltip: '¿Quieres vender? Crea una tienda y haz crecer tu negocio!'
  },
  {
    color: COLORS['red'],
    title: 'Comprador',
    disabled: () => false,
    type: 'Comprar',
    icon: <BiStore style={{ fontSize: '3rem' }} />,
    tooltip: '¿Quieres comprar? Compra todo lo que encuentres'
  }
];

export const paths = [
  {
    type: 'SELLER',
    title: 'Vendedor',
    disabled: rolemenu() != '/buyer',
    items: [
      {
        name: 'Inicio',
        icon: <GiHouse />,
        route: '/seller'
      },
      {
        name: 'Productos',
        icon: <BsCart3 />,
        route: '/seller/productos'
      },
      {
        name: 'Pedidos',
        icon: <BsBoxSeam />,
        route: '/seller/pedidos'
      },

      {
        name: 'Devoluciones',
        icon: <IoIosSync />,
        route: '/seller/devoluciones'
      } /*
      {
        name: 'Subastas',
        icon: <CgVolume />,
        route: '/seller/subastas'
      },
      */,
      {
        name: 'Cotizaciones',
        icon: <BsMegaphone />,
        route: '/seller/cotizacion'
      },
      {
        name: 'Estadisticas',
        icon: <BsBarChart />,
        route: '/seller/estadisticas'
      },
      {
        name: 'Configuración',
        icon: <BiCog />,
        route: '/seller/configuracion'
      },

      {
        name: 'Facturación',
        icon: <GiDiplodocus />,
        route: '/seller/facturacion'
      },

      // {
      //   name: 'Ayuda',
      //   icon: <BiHelpCircle />,
      //   route: '/seller/CentroAyuda'
      // },
      {
        name: 'Planes',
        icon: <BsClipboardCheck />,
        route: '/seller/planes'
      }
    ]
  },
  {
    type: 'BUYER',
    title: 'Comprador',
    disabled: false,
    items: [
      {
        name: 'Inicio',
        icon: <GiHouse />,
        route: '/buyer'
      },
      {
        name: 'Pedidos',
        icon: <BsCart3 />,
        route: '/buyer/pedidos'
      },

      {
        name: 'Devoluciones',
        icon: <IoIosSync />,
        route: '/buyer/devoluciones'
      },
      /*
      {
        name: 'Subastas',
        icon: <CgVolume />,
        route: '/buyer/subastas'
      },
      */
      {
        name: 'Mi Lista',
        icon: <BsListTask />,
        route: '/buyer/lista'
      },
      {
        name: 'Configuración',
        icon: <BiCog />,
        route: '/buyer/configuracion'
      }

      // {
      //   name: 'Ayuda',
      //   icon: <BiHelpCircle />,
      //   route: '/buyer/CentroAyuda'
      // }
    ]
  }
];
