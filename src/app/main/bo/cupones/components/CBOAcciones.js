import {
  cancel_coupon,
  delete_coupon
} from '@/app/api/graphql/webcoupon/WCouponService';
import { CVColumn, CVSelectButton, CVText } from '@/common/CovendeTemplate';
import {
  CVAlertConfirm,
  CVAlertSuccess
} from '@/common/CovendeTemplate/CVAlert';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useHistory } from 'react-router';
import { useToast } from '@chakra-ui/toast';

function CBOAcciones({ idcupon, fetchdata }) {
  const addToast = useToast();
  const history = useHistory();
  const editar = () => {
    history.push('/bo/cupones/' + idcupon);
  };

  const cancels = async () => {
    const res = await cancel_coupon({ coupon_id: idcupon, status: true });
    if (res != null) {
      CVAlertSuccess({ addToast, message: 'Cupon cancelado correctamente' });
      fetchdata();
    }
  };

  const deleted = async () => {
    const res = await delete_coupon(idcupon);
    if (res != null) {
      CVAlertSuccess({ addToast, message: 'Cupon Eliminado correctamente' });
      fetchdata();
    }
  };

  const cancelar = () => {
    CVAlertConfirm({
      message: '¿Seguro con cancelar este cupón?',
      title: 'Cancelar Cupón',
      okAction: () => cancels()
    });
  };
  const eliminar = () => {
    CVAlertConfirm({
      message: '¿Seguro con eliminar este cupón?',
      title: 'Eliminar Cupón',
      okAction: () => deleted()
    });
  };

  // return (
  //   <CVSelectButton
  //     actions={[
  //       { action: () => editar(), label: 'Editar' },
  //       { action: () => cancelar(), label: 'Cancelar' },
  //       { action: () => eliminar(), label: 'Eliminar' }
  //     ]}
  //   />
  // );
  return (
    <CVColumn alignItems='center'>
      <Box onClick={() => cancelar()}>
        <CVText color='primary' fontSize='0.85rem'>
          Cancelar
        </CVText>
      </Box>
      <Box onClick={() => editar()}>
        <CVText color='primary' fontSize='0.85rem'>
          Ver Detalle
        </CVText>
      </Box>
    </CVColumn>
  );
}

export default CBOAcciones;
