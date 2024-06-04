import React, { useEffect, useState } from 'react';

import faker from 'faker';

import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';

import DatosGenerales from './components/DatosGenerales';
import DatosEmpresa from './components/DatosEmpresa';
import CuentaBancaria from './components/CuentaBancaria';
import MisTarjetas from './components/MisTarjetas';
import ValidacionDocumentaria from './components/ValidacionDocumentaria';
import { GiPlayButton } from 'react-icons/gi';
import DeliveryOwn from './components/DeliveryOwn';
import { useLocation } from 'react-router-dom';

const AccordionTitle = (props) => (
  <AccordionButton paddingLeft='8px'>
    <Box
      flex='1'
      display='flex'
      alignItems='center'
      textAlign='left'
      color='#004574'
      fontFamily='"Poppins"'
      fontSize='16px'
      fontWeight='bold'
      lineHeight='24px'>
      <GiPlayButton />
      &nbsp;
      {props.children}
    </Box>
    <AccordionIcon />
  </AccordionButton>
);

function InformacionClientesBo() {
  const [indexMain, setIndexMain] = useState([0]);
  const location = useLocation();
  const search = location.search;
  const searchParams = new URLSearchParams(search);
  const [init, setInit] = useState(true);

  const sectionsComponents = [
    {
      title: 'Datos generales',
      component: <DatosGenerales />,
      lorem: faker.lorem.paragraph
    },
    {
      title: 'Datos de Empresa',
      component: <DatosEmpresa />,
      lorem: faker.lorem.paragraph
    },
    {
      title: 'Cuenta bancaria',
      component: <CuentaBancaria />,
      lorem: faker.lorem.paragraph
    },
    {
      title: 'Mis tarjetas',
      component: <MisTarjetas />,
      lorem: faker.lorem.paragraph
    },
    {
      title: 'Delivery',
      component: <DeliveryOwn />,
      lorem: faker.lorem.paragraph
    },
    {
      title: 'Validación documentaria',
      component: <ValidacionDocumentaria />,
      lorem: faker.lorem.paragraph
    }
  ];

  let getStep = () => {
    let step = searchParams.get('step');
    step = Number(step || '-');

    if (!isNaN(step) && step > -1 && step <= 6) setIndexMain([step - 1]);

    setInit(false);
  };

  useEffect(() => {
    getStep();
  }, []);

  return !init ? (
    <>
      <Accordion bg='#FFFFFF' defaultIndex={indexMain} allowMultiple>
        {sectionsComponents.map((item, index) => (
          <AccordionItem key={index}>
            <AccordionTitle>{item.title}</AccordionTitle>
            <AccordionPanel p='16px 28px'>{item.component}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  ) : (
    <></>
  );
}

export default InformacionClientesBo;
