import { iconHouse } from '@/app/main/crea-tu-tienda/components/CreateStoreIcons';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVLine, CVText, CVCheckBox } from '@/common/CovendeTemplate';
import DetailPlane from './DetailPlane';
import { Flex, Text, useDisclosure, Spacer } from '@chakra-ui/react';
import { Box } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BaseCommission from './components/BaseCommission';
import dataFooterLinks from '@/app/layouts/BuyerSeller/BuyerSellerFooter/FooterLinks.data';

function SellerPlanes({ planActive }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  let lista = [
    {
      value: 'Publica',
      text: 'Publica productos ilimitados.*'
    },
    {
      value: 'Pagos',
      text: 'Acepta pagos por VISA y Mastercard.'
    },
    {
      value: 'Servicio',
      text: 'Gestión de mensajería para atención de clientes.'
    },
    {
      value: 'Publicidad',
      text: 'Publicidad y exposición de tu marca en nuestra plataforma y otras redes de negocios.'
    },
    {
      value: 'Usuarios',
      text: 'Agrega hasta 4 usuarios para la gestión de tu cuenta.'
    },
    {
      value: 'Usuarios',
      text: ' Obtén reportes y estadísticas de ventas'
    }
  ];

  useEffect(() => {
    init();
  }, []);
  return (
    <>
      <Box>
        <Flex>
          <CVText>Plan Anual</CVText>
          <Spacer />
          <CVText>Plan Anual</CVText>
        </Flex>
        <Box></Box>
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#ECECEC'
        }}>
        <SizeBox height='2rem' />
        <Box
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '1.5rem',
            padding: '2rem',
            width: '100%',
            maxWidth: '600px'
          }}>
          <Flex
            justifyContent='center'
            direction='column'
            alignItems='center'
            mt={10}>
            <CVLine
              backgroundColor='white'
              height='1px'
              color='#00ADF6'
              titles={[
                '',
                <CVText fontSize='1.8rem' fontWeight='bold' color='skyblue'>
                  <Flex
                    width={planActive ? '240px' : '80px'}
                    justifyContent='center'>
                    {planActive ? 'Abre tu tienda a solo:' : 'PLANES'}
                  </Flex>
                </CVText>,
                ''
              ]}
            />

            <SizeBox height='2rem' />
            {iconHouse}
            <SizeBox height='2rem' />
            <Flex alignItems='end'>
              <Text color='#004772' fontWeight='bold' fontSize='3rem'>
                S/{eval(planActive?.price || '0').toFixed(2)}
              </Text>
              <Text color='#004772' fontWeight='bold'>
                {/*/{planActive?.periodo || '0'} meses */}/ {planActive?.name}.
              </Text>
            </Flex>
            <Text color='#004772'>+ Comisiones por ventas</Text>
            <SizeBox height='2rem' />
            <SizeBox height='2rem' />
            <Text color='#004772'></Text>
            {/* 
          <CVButton onClick={onOpen} fontSize='1.5rem'>
            Comprar
          </CVButton>
          <SizeBox height='2rem' />
          */}
          </Flex>
          <CVLine
            backgroundColor='white'
            height='1px'
            color='blue'
            titles={[
              '',
              <CVText
                fontSize='1.2rem'
                fontWeight='bold'
                color='blue'
                display='flex'>
                <Flex width='400px !important' justifyContent='center'>
                  Accede a los todos beneficios de nuestra plataforma:
                </Flex>
              </CVText>,
              ''
            ]}
          />
          <SizeBox height='2rem' />
          <Box>
            {lista.map((item, i) => (
              <Flex key={i}>
                <Text my={5} fontSize='1.1rem'>
                  {item.text}
                </Text>
                <Spacer></Spacer>
                <Box mt={2}>
                  <svg
                    width='21'
                    height='21'
                    viewBox='0 0 21 21'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <rect
                      x='0.5'
                      y='0.5'
                      width='20'
                      height='20'
                      rx='2.5'
                      fill='white'
                      stroke='#00ADF6'
                    />
                    <path
                      d='M6.06066 10.9393C5.47487 10.3536 4.52513 10.3536 3.93934 10.9393C3.35355 11.5251 3.35355 12.4749 3.93934 13.0607L6.06066 10.9393ZM9 16L7.93934 17.0607C8.24541 17.3667 8.66879 17.5257 9.10067 17.4966C9.53254 17.4676 9.93082 17.2534 10.1931 16.9091L9 16ZM18.1931 6.40906C18.6952 5.75011 18.568 4.80892 17.9091 4.30685C17.2501 3.80479 16.3089 3.93198 15.8069 4.59094L18.1931 6.40906ZM3.93934 13.0607L7.93934 17.0607L10.0607 14.9393L6.06066 10.9393L3.93934 13.0607ZM10.1931 16.9091L18.1931 6.40906L15.8069 4.59094L7.80685 15.0909L10.1931 16.9091Z'
                      fill='#00ADF6'
                    />
                  </svg>
                </Box>
              </Flex>
            ))}
            {/* 
          <CVCheckBox
            itemDirection='column'
            itemJustify='end'
            onChange={(values) => setCondicion(values)}
            options={[
              {
                value: 'Publica',
                text: 'Publica productos ilimitados.*'
              },
              {
                value: 'Pagos',
                text: 'Acepta pagos por VISA y Mastercard.'
              },
              {
                value: 'Servicio',
                text: 'Gestión de mensajería para atención de clientes.'
              },
              {
                value: 'Publicidad',
                text: 'Publicidad y exposición de tu marca en nuestra plataforma y otras redes de negocios.'
              },
              {
                value: 'Usuarios',
                text: 'Agrega hasta 4 usuarios para la gestión de tu cuenta.'
              },
              {
                value: 'Usuarios',
                text: ' Obtén reportes y estadísticas de ventas'
              }
            ]}
          />
          */}
          </Box>
          {/* 
        <Box>
          <Text pl={1} color='#00ADF6'>
            * Sólo por lanzamiento. Disponible hasta el 31/03/21
          </Text>
        </Box>
        */}
          <SizeBox height='2rem' />
          <Box>
            <Flex
              justifyContent='center'
              direction='column'
              alignItems='center'>
              <CVButton onClick={onOpen} fontSize='1.1rem' padding='2px 40px'>
                Comprar
              </CVButton>
            </Flex>

            <BaseCommission />
          </Box>
        </Box>
        <SizeBox height='2rem' />

        <DetailPlane isOpen={isOpen} onClose={onClose} />
      </Box>
    </>
  );
}

export default SellerPlanes;
