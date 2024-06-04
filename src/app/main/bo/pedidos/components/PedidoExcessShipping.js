import { useState, useEffect } from 'react';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import {
  CVButton,
  CVLink,
  CVModal,
  CVText,
  CVSelect
} from '@/common/CovendeTemplate';
import { Flex } from '@chakra-ui/react';
import { Grid } from '@material-ui/core';
import { useToast } from '@chakra-ui/toast';
import React from 'react';
import { motives_cancel } from '@CVApi/core/webbuy/TableAPIService';
import {
  ADD_ORDER_EXCESS_SHIPPING,
  ADD_PEDIDOS_CANCELED_SELLER
} from '@CVApi/core/webadmin/types/PedidoType';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';

function PedidoExcessShippingBo({ isOpen, onClose, pedido, success }) {
  const [loading, setloading] = useState(false);
  const addToast = useToast();

  const addExcessShipping = async () => {
    setloading(true);
    AxiosGQL(ADD_ORDER_EXCESS_SHIPPING(pedido.pedido_id))
      .then(({ addOrderExcessShipping }) => {
        if (addOrderExcessShipping?.status === true) {
          CVAlertSuccess({
            addToast,
            message: addOrderExcessShipping?.message
          });
          success(true);
          onClose();
        } else {
          CVAlertError({
            addToast,
            message: 'Error' || res.addPedidoCanceledSeller?.message
          });
          onClose();
        }

        setloading(false);
      })
      .catch((err) => {
        setloading(false);
        console.log({ err });
      });
  };

  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='primary'
      header={'Exceso de envío'}
      colorHeader='white'
      footer={
        <Flex width='100%'>
          <CVButton onClick={addExcessShipping} isLoading={loading}>
            CONFIRMAR
          </CVButton>
          <SizeBox />
        </Flex>
      }>
      <SizeBox />
      <CVText color='blue' textAlign='center'>
        Al hacer clic en <span style={{ fontWeight: 'bold' }}>CONFIRMAR</span>{' '}
        estás aceptando agregar el costo de envío del prodcuto como exceso de
        envío al pedido{' '}
        <span style={{ fontWeight: 'bold' }}>{pedido?.custom_id || ''}</span>.
      </CVText>
    </CVModal>
  );
}

export default PedidoExcessShippingBo;
