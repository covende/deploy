import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { CVButton, CVModal } from '@/common/CovendeTemplate';
import { Flex, Box } from '@chakra-ui/react';
import React from 'react';
import { rolemenu } from '@/app/helpers/role';
import { useHistory, useLocation } from 'react-router-dom';
import CVText from '@CVTemplate/core/CVText';

function AlertCompanyDirection({ isOpen, onClose }) {
  const history = useHistory();
  const location = useLocation();
  let role = rolemenu();

  const next = () => {
    if (role == '/bo/') {
      let position = location.pathname.indexOf('productos');
      history.push(
        location.pathname.substring(0, position) + 'information?step=2'
      );
    } else {
      history.push('/seller/configuracion?step=2');
    }
  };

  return (
    <CVModal
      header='Alerta'
      bgHeader='red'
      colorHeader='white'
      isOpen={isOpen}
      onClose={onClose}
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            <CVButton onClick={() => next()} backgroundColor='red'>
              {role == '/bo/' ? 'Establecimientos Conexos' : 'Mis Direcciones'}
            </CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />
      <CVText color='blue' fontSize='18px'>
        Antes de crear tus productos es necesario agregar como mínimo una&nbsp;
        <b>dirección de almacen</b> para el recojo de tus productos, dar clic
        en&nbsp;
        {role == '/bo/' ? 'establecimientos conexos.' : 'mis direcciones.'}
      </CVText>
    </CVModal>
  );
}

export default AlertCompanyDirection;
