import React, { useEffect, useState } from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import CVPanel from '@CVTemplate/core/CVPanel';
import { useParams } from 'react-router-dom';
import CVText from '@CVTemplate/core/CVText';
import SizeBox from '@/common/components/CustomComponent/SizeBox';
import CVRow from '@CVTemplate/core/CVRow';
import CVLine from '@CVTemplate/core/CVLine';
import RSolicitud from './components/RSolicitud';
import RPedido from './components/RPedido';
import RDevolucion from './components/RDevolucion';
import {
  add_pedido_refund,
  get_pedido_canceled_by_pedido,
  get_pedido_refund_by_pedido
} from '@CVApi/core/webreembolso/ReemServices';
import RCancelacion from './components/RCancelacion';
import { devolucion_by_pedido_id } from '@CVApi/core/webdevolucion/DevService';
function BuyerReembolso() {
  const { pedido_id, provenace } = useParams();
  const [reembolso, setreembolso] = useState({});
  const [devolucion, setDevolucion] = useState({});
  const [reason, setReason] = useState('');
  const [updateData, setUpdateData] = useState(false);
  const initdata = async () => {
    // if (provenace == 'devolution') {
    const refund = await get_pedido_refund_by_pedido(pedido_id);
    if (refund) setreembolso(refund);
    const getReason = await get_pedido_canceled_by_pedido(pedido_id);
    setReason(getReason.reason);
  };

  const getDevolution = async () => {
    const devolutionPedidoId = await devolucion_by_pedido_id(pedido_id);
    setDevolucion(devolutionPedidoId);
  };

  useEffect(() => {
    initdata();
    getDevolution();
  }, [pedido_id, updateData]);

  return (
    <Container>
      <CVPanel variant='box' padding='2rem'>
        <CVText>
          Lamentamos que no estés satisfecho con tu pedido. Por favor confirma
          la siguiente información y haz clic en “Solicitar reembolso”.
        </CVText>
        <SizeBox />
        <CVRow alignItems='center'>
          <CVText color='blue' fontWeight='bold' marginRight='3px'>
            ID Pedido:
          </CVText>
          <CVText color='blue'>{reembolso?.custom_id || ''}</CVText>
        </CVRow>
        <CVLine color='gray' lineHeight='1px' />
        <SizeBox />
        <Grid container spaceing={5}>
          <Grid item sx={12} sm={6} md={6}>
            <RSolicitud
              reembolso={reembolso}
              setreembolso={setreembolso}
              setUpdateData={setUpdateData}
              updateData={updateData}
            />
          </Grid>
          <Grid item sx={12} sm={6} md={6}>
            {provenace == 'devolution' && (
              <RDevolucion reembolso={reembolso} devolucion={devolucion} />
            )}
            {provenace == 'cancelation' && (
              <RCancelacion reembolso={reembolso} reason={reason} />
            )}
            <RPedido reembolso={reembolso} />
          </Grid>
        </Grid>
      </CVPanel>
    </Container>
  );
}

export default BuyerReembolso;
