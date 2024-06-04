import { Flex } from '@chakra-ui/react';
import React from 'react';
import { CVButton, CVLine, CVText, CVModal } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { useHistory } from 'react-router-dom';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { REJECT_DEVOLUTION } from '@CVApi/core/webdevolucion/DevTypes';

function DDisputa({ isOpen, onClose, iddevolucion }) {
  const history = useHistory();
  // const confirma = () => history.push('/seller/mensajes/' + iddevolucion);
  const confirma = () => {
    AxiosGQL(REJECT_DEVOLUTION(iddevolucion)).then(({ rejectDevolution }) => {
      if (!!rejectDevolution.sala)
        history.push('/seller/mensajes/' + rejectDevolution.sala);
    });
  };

  return (
    <CVModal
      onClose={onClose}
      size='xl'
      isOpen={isOpen}
      header='Se abrirá una disputa con el comprador.'
      bgHeader='primary'
      colorHeader='white'
      footer={
        <Flex justifyContent='center'>
          <CVButton backgroundColor='green' onClick={confirma}>
            Ir a Mensajería
          </CVButton>
          <SizeBox />
          <CVButton
            backgroundColor='white'
            boxShadow='none'
            color='green'
            border='none'
            onClick={() => onClose()}>
            Volver a la lista de devoluciones
          </CVButton>
        </Flex>
      }>
      <SizeBox />
      <CVText textAlign='center'>
        Haz clic en Ir a Mensajería e ingresa los motivos de tu rechazo de la
        devolución. Mantente al tanto de las respuestas del comprador.
      </CVText>
      <CVLine color='gray' lineHeight='1px' />
    </CVModal>
  );
}

export default DDisputa;
