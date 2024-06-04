import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Typography, Grid } from '@material-ui/core';
import { CVButton, CVModal } from '@/common/CovendeTemplate';
import { Box, Flex, Text } from '@chakra-ui/react';
import { add_order_receipt } from '@CVApi/core/webpedido/PedidoService';
import React, { useState } from 'react';
import { CVAlertError } from '@CVTemplate/core/CVAlert';
import { useToast } from '@chakra-ui/toast';
import CVInputFile from '@CVTemplate/core/CVInputFile';

function PedidoGenera({ isOpen, onClose, process, store_id, pedido }) {
  const [loading, setloading] = useState(false);
  const addToast = useToast();
  const [receipt, setReceipt] = useState('');

  const send = async () => {
    setloading(true);
    const result = await add_order_receipt(pedido.pedido_id, receipt);
    if (result) process({ receipt, pedido_id: pedido.pedido_id });
    else {
      setloading(false);
      CVAlertError({
        addToast,
        message: 'Ocurrieron errores, vuelva a enviarlo mas tarde'
      });
    }
  };

  return (
    <CVModal
      isOpen={isOpen}
      onClose={onClose}
      bgHeader='primary'
      header='Solo un paso más para enviar'
      colorHeader='white'
      footer={
        <Flex width='100%' justifyContent='center'>
          <Box>
            <CVButton isLoading={loading} disabled={loading} onClick={send}>
              ENVIAR
            </CVButton>
          </Box>
        </Flex>
      }>
      <SizeBox />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Text align='center'>Adjunta el comprobante de pago:</Text>
        </Grid>
        <Grid item xs={12}>
          <CVInputFile callback={(res) => setReceipt(res.data)}>
            Elegir archivo
          </CVInputFile>
          <Typography variant='caption'>
            PDF, JPG, JPEG, PNG {'<'} 10 mb{' '}
          </Typography>
        </Grid>
      </Grid>
    </CVModal>
  );
}

export default PedidoGenera;
