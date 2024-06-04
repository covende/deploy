import { Flex, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { CVButton, CVLine, CVModal, CVText } from '@/common/CovendeTemplate';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVAlertError, CVAlertSuccess } from '@/common/CovendeTemplate/CVAlert';
import { useHistory } from 'react-router-dom'

function DAprobar({ isOpen, onClose, iddevolucion, fetchdata, title }) {
  const [loading, setloading] = useState(false);
  const history = useHistory();
  const addToast = useToast();
  const confirma = async () => {
    setloading(true);
    const { approveDevolution } = await AxiosGQL(`mutation{
      approveDevolution(devolution_id:"${iddevolucion}")
    }`);
    if (approveDevolution) {
      CVAlertSuccess({ addToast, message: 'Aprobado Correctamente' });
      await onClose();
      history.push(`/${title != 'bo' ? 'seller' : 'bo'}/devoluciones`);
    } else {
      CVAlertError({ addToast, message: 'Hubieron Errores' });
    }
    setloading(false);
  };

  return (
    <CVModal
      onClose={onClose}
      size='xl'
      isOpen={isOpen}
      header='Confirmación de aprobación'
      bgHeader='primary'
      colorHeader='white'>
      <SizeBox />
      <CVText textAlign='center' fontWeight='bold' color='blue'>
        Estás aprobando la solicitud de devolución
      </CVText>
      <SizeBox />
      <CVText textAlign='center' color='blue'>
        El Comprador recibirá una notificación para proceder con el envío del
        producto.
      </CVText>
      <SizeBox />
      <Flex justifyContent='center'>
        <CVButton
          onClick={confirma}
          backgroundColor='green'
          disabled={loading}
          isLoading={loading}>
          CONFIRMAR
        </CVButton>
      </Flex>
    </CVModal>
  );
}

export default DAprobar;
