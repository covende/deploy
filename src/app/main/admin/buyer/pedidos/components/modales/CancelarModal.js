import { Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import cancelapedido from '@/app/assets/img/cancelapedido.svg';
import { Grid, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { CVButton, CVImage, CVModal, CVSelect } from '@/common/CovendeTemplate';
import AxiosGQL from '@/app/api/rest/AxiosGQL';
import { PUBLIC_PRODUCT_BY_ID } from '@/app/api/graphql/webpublic/products/CartService';
import { motives_cancel } from '@/app/api/graphql/webbuy/TableAPIService';
import {
  add_pedido_canceled,
  add_pedido_refund
} from '@CVApi/core/webreembolso/ReemServices';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import CVText from '@CVTemplate/core/CVText';
import { CVRenderHTML } from '@CVTemplate/core/CVMethods';
import ConfirmCancel from './ConfirmCancel';

function CancelarModal({ isOpen, onClose, idpedido, pedido, setsuccess }) {
  const addToast = useToast();
  const [producto, setproducto] = useState({
    product_image: pedido?.product?.photo || 'https://via.placeholder.com/150',
    product_name: pedido?.producto || '',
    descripcion: pedido?.product?.featured_description || '',
    price: pedido?.total || '',
    motivo_cancel: 0
  });

  const [confirm, setconfirm] = useState(false);

  const [motivos, setmotivos] = useState([]);
  const [loading, setloading] = useState(true);
  const [sending, setsending] = useState(false);
  const initdata = async () => {
    setloading(true);
    const motives = await motives_cancel('61d36b024e047600460a2d89');

    setmotivos(motives);
    setloading(false);
  };

  useEffect(() => {
    initdata();
  }, [pedido]);

  const aceptar = async () => {
    setsending(true);

    const result = await add_pedido_canceled({
      pedido_id: pedido?.pedido_id,
      reason_id: producto.motivo_cancel
    });
    if (result) {
      localStorage.setItem('cancelation_id', result?.custom_id);
      setsuccess(true);
      onClose();
    } else {
      CVAlertError({ addToast, message: 'Ocurrió un error al cancelar el pedido.' });
    }
    setsending(false);
  };
  return pedido != null ? (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      size='3xl'
      footer={
        <Flex justifyContent='space-between' alignItems='end' width='100%'>
          <CVImage image={cancelapedido} />
          <Box>
            <CVButton
              disabled={producto.motivo_cancel == 0 || sending}
              isLoading={sending}
              onClick={() => setconfirm(true)}
              backgroundColor='red'>
              ENVIAR
            </CVButton>
          </Box>
        </Flex>
      }>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box>
            <CVImage image={producto.product_image} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <CVText color='blue' fontWeight='bold'>
            {producto.product_name}
          </CVText>
          <Flex justifyContent='space-between'></Flex>
          <CVText variant='maxtext' lines={3}>
            <CVRenderHTML>{producto?.descripcion || ''}</CVRenderHTML>
          </CVText>
        </Grid>
        <Grid item xs={3}>
          <CVText color='blue' fontWeight='bold'>
            Monto Total
          </CVText>
          <CVText color='blue' fontWeight='bold'>
            S/ {producto.price}
          </CVText>
        </Grid>
        <Grid item xs={12}>
          <CVSelect
            titleColor='#004772'
            title='Motivo de cancelación'
            titleOrientation='column'
            value={producto.motivo_cancel}
            onChange={(value) =>
              setproducto({ ...producto, motivo_cancel: value })
            }
            options={[
              ...motivos.map((item) => ({ value: item._id, text: item.title }))
            ]}
          />
        </Grid>
      </Grid>
      {confirm && (
        <ConfirmCancel
          isOpen={confirm}
          onClose={() => setconfirm(false)}
          process={() => {
            setconfirm(false);
            aceptar();
          }}
        />
      )}
    </CVModal>
  ) : (
    <Box></Box>
  );
}

export default CancelarModal;
