import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVCheckBox } from '@/common/CovendeTemplate';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Center,
  Text,
  Box
} from '@chakra-ui/react';
import { toBase64 } from '@CVTemplate/core/CVCardProduct/CVCardProductMethod';
import * as User from '@/app/helpers/authUtils';
import React from 'react';
import { useHistory } from 'react-router-dom';
import BaseCommission from './components/BaseCommission';
import OptionsPlan from './components/OptionsPlan';
import { CVText } from '@CVTemplate/core/index';
import { CVFormatDate } from '@CVTemplate/core/CVMethods';

function DetailPlane({ isOpen, onClose, plan }) {
  const routerHistory = useHistory();
  const goto_pay = () => {
    // plan.status === 'Activo' && routerHistory.push('/seller/cancelar');
    routerHistory.push('/seller/pay_plan/' + toBase64(JSON.stringify(plan)));
  };

  let lista = [
    {
      value: 'Publica',
      text: plan.unlimited
        ? 'Publica productos ilimitados.*'
        : `Publica hasta ${plan.productsPost || 0} productos*`
    },
    // {
    //   value: 'Pagos',
    //   text: 'Acepta pagos por VISA y Mastercard.'
    // },
    {
      value: 'Servicio',
      text: 'Gestión de mensajería para atención de clientes.'
    },
    // {
    //   value: 'Publicidad',
    //   text: 'Publicidad y exposición de tu marca en nuestra plataforma y otras redes de negocios.'
    // },
    {
      value: 'Usuarios',
      text: `Agrega ${
        plan.subaccounts ? `hasta ${plan.subaccounts}` : ''
      } usuarios para la gestión de tu cuenta.`
    },
    {
      value: 'Usuarios',
      text: ' Obtén reportes y estadísticas de ventas'
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
      <ModalOverlay />
      <ModalContent>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Box>
            <Box my={1}>
              <CVText
                color='skyblue'
                fontSize='1.8rem'
                fontWeight='bold'
                textAlign='center'>
                {plan.name}
              </CVText>
            </Box>
            <OptionsPlan lista={lista} />
            <Box>
              <Text pl={1} color='#00ADF6'>
                {`* Sólo por lanzamiento. Disponible hasta el ${CVFormatDate({
                  date: plan.fecha_fin
                })}`}
              </Text>
            </Box>
            <SizeBox height='2rem' />
            <Center>
              {plan.status !== 'Activo' && plan.status !== 'Cancelado' && (
                <CVButton fontSize='1.5rem' onClick={() => goto_pay()}>
                  Comprar plan
                </CVButton>
              )}
            </Center>

            <Box>
              <BaseCommission />
            </Box>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default DetailPlane;
