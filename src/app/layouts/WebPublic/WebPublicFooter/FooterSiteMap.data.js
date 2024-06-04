import React from 'react';

import { Text } from '@chakra-ui/react';
import { CgPhone, CgMail } from 'react-icons/cg';
import libro from '@/app/assets/images/libro.svg'; 
import { CVImage } from '@/common/CovendeTemplate';


export const dataFooterSiteMap = [
  {
    title: 'SERVICIO AL CLIENTE',
    sections: [
      {
        title: 'Cambios y Devoluciones',
        route: '/AyudaCompradores'
      },
      {
        title: 'Políticas de Privacidad',
        route: '/politica-de-privacidad'
      },
      {
        title: 'Preguntas Frecuentes',
        route: '/AyudaCompradores'
      },
      {
        title: 'Términos y Condiciones',
        route: '/terminos-y-condiciones'
      },
      {
        title: 'Aviso de Privacidad',
        route: '/politica-de-privacidad'
      },
      {
        title: 'Términos y condiciones sorteos',
        route: '/terminos-y-condiciones-sorteos'
      },
      
      {
        title: (
          <div>
            <CVImage
                // link={item.imagelink}
                image={libro}
                width='auto'
                height='50px'
              />

            
          </div>
        ),
        route: '/libro-de-reclamaciones'
      }
    ]
  },
  // {
  //   title: '¿QUÉ PUEDO HACER EN COVENDE?',
  //   sections: [
  //     {
  //       title: 'Vende en CoVende',
  //       route: '/inicio'
  //     },
  //     {
  //       title: 'Market Place',
  //       route: '/tienda'
  //     },
  //     {
  //       title: 'Compra por Subasta',
  //       route: '#'
  //     },
  //     {
  //       title: 'Preguntas Frecuentes',
  //       route: '/preguntas-frecuentes'
  //     },
  //     {
  //       title: 'Aviso de Privacidad',
  //       route: '/politica-de-privacidad'
  //     },
  //     {
  //       title: 'Ver productos del MarketPlace',
  //       route: '#'
  //     }
  //   ]
  // },
  {
    title: 'Mi cuenta',
    sections: [
      {
        title: 'Registro',
        route: '/registrar-cuenta'
      },
      {
        title: 'Mi cuenta',
        route: '/admin'
      },
      // {
      //   title: 'Carrito de compras',
      //   route: '/carrito-de-compras'
      // },
      {
        title: 'Mis pedidos',
        route: '/buyer/pedidos'
      }
      // {
      //   title: 'Tienda',
      //   route: '/tienda'
      // }
    ]
  },
  {
    title: 'ACERCA DE COVENDE',
  sections: [
    // {
    //   title: 'Nosotros',
    //   route: '/nosotros'
    // },
    // {
    //   title: '¿Qué es CoVende?',
    //   route: '/preguntas-frecuentes'
    // },
    {
      title: 'Contactar con CoVende',
      // route: '/nosotros'
    },
    {
      title: (
        <div>
          {/* <div style={{ display: 'flex' }}>
            <CgPhone />
            &nbsp;{' '}
            <Text fontSize='12px' fontWeight='700'>
              {' '}
              +51 986 322 348
            </Text>
          </div> */}
          <div style={{ display: 'flex' }}>
            <CgMail />
            &nbsp;{' '}
            <Text fontSize='12px' fontWeight='700'>
              info@covende.com
            </Text>
          </div>
        </div>
      )
    },
    {
      title: (
        <div>
          <Text fontSize='12px' fontWeight='400'></Text>
          <Text fontSize='12px' fontWeight='400'></Text>
          <Text fontSize='12px' fontWeight='400'></Text>
        </div>
      )
    }
  ]}
];
