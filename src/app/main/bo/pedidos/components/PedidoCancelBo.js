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
import { ADD_PEDIDOS_CANCELED_SELLER } from '@CVApi/core/webadmin/types/PedidoType';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { CVAlertError, CVAlertSuccess } from '@CVTemplate/core/CVAlert';

function PedidoCancelBo({
  isOpen,
  onClose,
  idpedido,
  setsuccess,
  title,
  company_id
}) {
  const [open, setOpen] = useState(false);
  const [motives, setMotives] = useState([]);
  const [reasonId, setReasonId] = useState('');
  const [loading, setloading] = useState(false);
  const addToast = useToast();

  useEffect(() => {
    motives_cancel('62212aef9a35bc05bddfdf44')
      .then((motives) => setMotives(motives))
      .catch((err) => console.log({ err }));
  }, []);

  const deleting = async () => {
    setloading(true);

    AxiosGQL(ADD_PEDIDOS_CANCELED_SELLER({ idpedido, company_id, reasonId }))
      .then((res) => {
        if (res.addPedidoCanceledSeller?.status === true) {
          CVAlertSuccess({
            addToast,
            message: res.addPedidoCanceledSeller?.message
          });
          setsuccess(true);
          onClose();
        } else {
          CVAlertError({
            addToast,
            message: res.addPedidoCanceledSeller?.message
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
      header={title === 'cancel' ? 'Cancelación de pedido' : '¿Seguro?'}
      colorHeader='white'
      footer={
        <Flex width='100%'>
          <CVButton
            onClick={() => (title === 'cancel' ? deleting() : setOpen(!open))}
            isLoading={loading}
            variant='outlined'>
            CONFIRMAR
          </CVButton>
          <SizeBox />
          <CVButton onClick={onClose}>SEGUIR CON EL PEDIDO</CVButton>
        </Flex>
      }>
      <SizeBox />
      {title === 'cancel' ? (
        <Grid item xs={12}>
          <CVSelect
            titleColor='#004772'
            title='Motivo de cancelación'
            titleOrientation='column'
            value={reasonId}
            onChange={(value) => setReasonId(value)}
            options={[
              ...motives.map((item) => ({ value: item?._id, text: item.title }))
            ]}
          />
        </Grid>
      ) : (
        <>
          <CVText color='blue' textAlign='center'>
            <span style={{ fontWeight: 'bold' }}>
              Al cancelar el pedido estarás perdiendo la venta.
            </span>
            Esto afectará la reputación de tu tienda.
          </CVText>
          <SizeBox />
          <CVText color='blue' textAlign='center'>
            Al hacer clic en Confirmar estás aceptando asumir los costos que
            implique la cancelación.{' '}
            <CVLink
              text='Ver Términos y Condiciones'
              href='/terminos-y-condiciones'
            />
          </CVText>
        </>
      )}

      <PedidoCancelBo
        {...{ idpedido, company_id, setsuccess }}
        isOpen={open}
        title='cancel'
        onClose={() => setOpen(!open)}
        // process={() => deleting()}
      />
    </CVModal>
  );
}

export default PedidoCancelBo;
