import React from 'react';

// Loader
import ContentLoader from 'react-content-loader';

// Assets
import logoVisa from '@/app/assets/images/logo/Visa.svg';
import logoMastercard from '@/app/assets/images/logo/Mastercard.svg';
import logoAmericanExpress from '@/app/assets/images/logo/AmericanExpress.svg';
import logoDinnersClubInternational from '@/app/assets/images/logo/DinnersClubInternational.svg';
import logoPagoEfectivo from '@/app/assets/images/logo/PagoEfectivo.svg';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={props.width}
    height={props.height}
    viewBox={`0 0 ${props.width + 16} ${props.height + 16}
    `}
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'>
    <rect x='0' y='0' rx='0' ry='0' width={props.width} height={props.height} />
  </ContentLoader>
);

// export const listaLogos = [
//   {
//     fallback: <MyLoader width={198} height={64} />,
//     src: logoVisa,
//     alt: 'VISA'
//   },
//   {
//     fallback: <MyLoader width={83} height={64} />,
//     src: logoMastercard,
//     alt: 'Mastercard'
//   },
//   {
//     fallback: <MyLoader width={132} height={64} />,
//     src: logoAmericanExpress,
//     alt: 'American Express'
//   },
//   {
//     fallback: <MyLoader width={247} height={64} />,
//     src: logoDinnersClubInternational,
//     alt: 'Dinners Club International'
//   },
//   {
//     fallback: <MyLoader width={198} height={64} />,
//     src: logoPagoEfectivo,
//     alt: 'Pago Efectivo'
//   }
// ];

export const listaLogos = [
  {
    fallback: <MyLoader width={94} height={32} />,
    src: logoVisa,
    alt: 'VISA'
  },
  {
    fallback: <MyLoader width={41} height={32} />,
    src: logoMastercard,
    alt: 'Mastercard'
  },
  {
    fallback: <MyLoader width={66} height={32} />,
    src: logoAmericanExpress,
    alt: 'American Express'
  },
  {
    fallback: <MyLoader width={124} height={32} />,
    src: logoDinnersClubInternational,
    alt: 'Dinners Club International'
  },
  {
    fallback: <MyLoader width={94} height={32} />,
    src: logoPagoEfectivo,
    alt: 'Pago Efectivo'
  }
];
