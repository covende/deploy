import React, { useEffect, useState } from 'react';

import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  Flex,
  Text,
  useDisclosure,
  Spacer,
  Center,
  Button
} from '@chakra-ui/react';
import { Box } from '@material-ui/core';
import BaseCommission from './BaseCommission';
import { GET_CURRENT_COMPANY_PLAN } from '@/app/api/graphql/webbo/BClientService';
import { useDispatch, useSelector } from 'react-redux';
import { tienda } from '../../productos/redux/ProductUpdate';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import CVImage from '@CVTemplate/core/CVImage';
import { Link } from 'react-router-dom';
import OptionsPlan from './OptionsPlan';

function SubscriptionCancel({ planActive, title }) {
  const [plan, setPlan] = useState({});
  const { product } = useSelector((state) => state.ProductView);
  const dispatch = useDispatch();
  const [buyPlan, setBuyPlan] = useState(true);
  const init = async () => {
    let store_id = await tienda(dispatch, product);
    let { getCurrentPlanByCompany } = await AxiosGQL(
      GET_CURRENT_COMPANY_PLAN(store_id)
    );
    setPlan(getCurrentPlanByCompany);
  };

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
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        {buyPlan ? (
          <>
            <Box mt='1rem'>
              <Center color='#004772' fontSize='26px' fontWeight={500}>
                ¿Segur@ que quieres perder estos beneficios?
              </Center>
            </Box>
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
                <Center
                  color='#00ADF6'
                  fontSize='20px'
                  fontWeight='bold'
                  justifyContent='center'>
                  {title}
                </Center>
              </Flex>
              <SizeBox height='2rem' />
              <OptionsPlan lista={lista} />

              <SizeBox height='2rem' />
              <Box>
                <BaseCommission />
              </Box>
            </Box>
            <SizeBox height='2rem' />
            <Center>
              <Link to='/seller/seleccionar_plan'>
                <Button
                  backgroundColor='#17BF93'
                  borderRadius='14px'
                  color='white'>
                  COMPRAR OTRO PLAN
                </Button>
              </Link>
              <br />
              <br />
              <SizeBox height='2rem' />
              <a onClick={() => setBuyPlan(false)}>Confirmar</a>
            </Center>
            <SizeBox height='2rem' />
          </>
        ) : (
          <Box minWidth='75rem'>
            <Text color='#004772' fontSize='26px' fontWeight={700}>
              Cancelación de suscripción confirmada
            </Text>
            <Flex mt='70px'>
              <Box>
                <Text color='#004772' fontSize='26px' fontWeight='500'>
                  ¡No pierdas ventas! <br /> Tenemos otros planes para ti.
                </Text>
                <Link to='/seller/seleccionar_plan'>
                  <Button
                    backgroundColor='#17BF93'
                    borderRadius='14px'
                    color='white'>
                    COMPRAR OTRO PLAN
                  </Button>
                </Link>
              </Box>
              <Box>
                <CVImage
                  image='https://covendefiles.s3.amazonaws.com/images/MejorPlan1.png'
                  width='200px'
                  height='200px'
                  variant='normal'
                />
              </Box>
            </Flex>
          </Box>
        )}

        {/* Cancelación de suscripción confirmada */}
      </Box>
    </>
  );
}

export default SubscriptionCancel;
