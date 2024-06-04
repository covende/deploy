import React, { useState } from 'react';

import { Grid, Container } from '@material-ui/core';
import { Box, Flex } from '@chakra-ui/layout';
import {
  CVButton,
  CVCheck,
  CVInput,
  CVModal,
  CVText
} from '@/common/CovendeTemplate';
import { isEmail } from '@/common/CovendeTemplate/CVValidation';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { useToast } from '@chakra-ui/toast';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { HiCheck } from 'react-icons/hi';
import { add_news_letter } from '@/app/api/graphql/webpublic/newsletter/NLService';
import { Link } from 'react-router-dom';
import { Tag, Tooltip, useDisclosure } from '@chakra-ui/react';
import { AiOutlineLike } from 'react-icons/ai';
import { COLORS } from '@/common/CovendeTemplate/CVThemes';
import CVTooltip from '@/common/CovendeTemplate/CVTooltip';

export default function FooterSubscribe() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [estado, setestado] = useState('fail');
  const addToast = useToast();
  const [isHover, setIsHover] = useState(null);
  const [suscribe, setsuscribe] = useState({
    email: '',
    termino: false
  });

  const suscribirse = async () => {
    if (!isEmail(suscribe.email)) {
      CVAlertError({ addToast, title: 'Error', message: 'Correo no válido' });
      return false;
    }
    if (!suscribe.termino) {
      CVAlertError({
        addToast,
        title: 'Error',
        message: 'Por favor, acepte los términos y condiciones para continuar.'
      });
      return false;
    }
    const result = await add_news_letter(suscribe.email);
    if (result.status) {
      CVAlertSuccess({
        addToast,
        message: 'Te has suscrito a Noticias y Ofertas',
        title: 'Suscripción a Noticias'
      });
      setestado('success');
    } else {
      CVAlertError({
        addToast,
        message: result.message,
        title: 'Error'
      });
      setestado('fail');
    }
    onOpen();
  };

  const msg = {
    success: {
      title: 'Registrado',
      message: (
        <CVText color='blue' textAlign='center'>
          Gracias por registrarte a nuestro newsletter. Ahora recibirás las mejores{' '}
          <span style={{ fontWeight: 'bold' }}>
          ofertas y promociones exclusivas de Covende
          </span>
        </CVText>
      )
    },
    fail: {
      title: 'Upps...',
      message: (
        <CVText color='blue' textAlign='center'>
          Este correo{' '}
          <span style={{ fontWeight: 'bold' }}>ya está suscrito.</span>
        </CVText>
      )
    }
  };

  return (
    <Box>
      <SizeBox />

      <CVText color='blue' textAlign='center' fontSize='1.25rem'>
        Entérese de las últimas tendencias de productos y noticias de la
        industria directamente en su buzón de entrada.
      </CVText>
      <SizeBox />

      {/* <Box display='flex' width='100%' justifyContent='space-evenly'>
        
        <Box w='25%' mr='-180px'>
          <CVInput
            borderRadius='7px'
            placeholder='Tu correo electrónico'
            value={suscribe.email}
            onChange={(value) => setsuscribe({ ...suscribe, email: value })}
          />
        </Box>

        <Box display='flex' alignItems='center'>
          <CVButton
            w='20%'
            fontWeight='bold'
            boxShadow='none'
            borderRadius='19px'
            variant='outlined'
            onClick={() => suscribirse()}
            alignItems='center'>
            <SizeBox />
            SUSCRIBIRME
            <SizeBox />
          </CVButton>
          <Box width='20%'>
            <p style={{
              fontSize: '10px',
              color: '#ABABAB',
              width: '30%',
              marginLeft:'16px'
            }}>
              Nunca compartiremos tu dirección de correo electrónico con una
            tercera persona
            </p>
          </Box>
        </Box>

      </Box> */}

      <Flex width='100%' justifyContent='center'>
        <Flex width='70%'>
          <Flex width='70%'>
            <CVInput
              borderRadius='1rem 0 0 1rem'
              placeholder='Escribe tu correo electrónico'
              value={suscribe.email}
              onChange={(value) => setsuscribe({ ...suscribe, email: value })}
            />
          </Flex>
          <Flex
            width='30%'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}>
            <CVTooltip
              title='Nunca compartiremos tu dirección de correo electrónico con una
            tercera persona'
              isOpen={isHover}
              icon={<AiOutlineLike style={{ fontSize: '3rem' }} />}>
              <CVButton
                width='100%'
                fontWeight='bold'
                boxShadow='none'
                borderRadius='0px 1rem 1rem 0px'
                variant='outlined'
                onClick={() => suscribirse()}
                alignItems='center'>
                <SizeBox />
                SUSCRIBIRME
                <SizeBox />
              </CVButton>
            </CVTooltip>
          </Flex>
        </Flex>
      </Flex>
      <SizeBox />
      <Flex justifyContent='center'>
        <CVCheck
          bgCheck='primary'
          checkIcon={<HiCheck style={{ color: 'white', fontWeight: 'bold' }} />}
          width='1.5rem'
          titleAlign='left'
          title={
            <CVText fontSizeResponsive='0.7rem'>
              Acepto los
              <Link
                to='/terminos-y-condiciones'
                style={{ padding: '0 0.35rem' }}>
                <CVText color='primary' fontSizeResponsive='0.7rem'>
                  Términos y Condiciones
                </CVText>
              </Link>
              , la
              <Link
                to='/politica-de-privacidad'
                style={{ padding: '0 0.35rem' }}>
                <CVText color='primary' fontSizeResponsive='0.7rem'>
                  {' '}
                  Política de Privacidad{' '}
                </CVText>
              </Link>
              y
              <Link to='/ayuda' style={{ padding: '0 0.35rem' }}>
                <CVText color='primary' fontSizeResponsive='0.7rem'>
                  Tratamiento de Datos Personales.
                </CVText>
              </Link>
            </CVText>
          }
          value={suscribe.termino}
          onChange={(value) => setsuscribe({ ...suscribe, termino: value })}
        />
      </Flex>
      <SizeBox />
      {isOpen && (
        <CVModal
          isOpen={isOpen}
          onClose={onClose}
          header={msg[estado].title}
          bgHeader='green'
          colorHeader='white'>
          <SizeBox />
          {msg[estado].message}
        </CVModal>
      )}
    </Box>
  );
}
