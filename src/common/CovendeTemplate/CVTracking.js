import { Box, Flex } from '@chakra-ui/layout';
import { get_tracking_by_pedido } from '@CVApi/core/webadmin/PedidoService';
import {
  devolucion_by_id,
  devolucion_by_pedido_id
} from '@CVApi/core/webdevolucion/DevService';
import React, { useEffect, useState } from 'react';
import { CVLine } from '.';
import CVButton from './CVButton';
import { defaultTrack } from './CVTracking/CVTrackingMethods';
import CVTrackingStep from './CVTracking/CVTrackingStep';
import CVTrackingTrack from './CVTracking/CVTrackingTrack';

/**
 *
 * @param {Object} param0
 * @param {('pedido' | 'devolucion')} param0.variant
 * @param {String} param0.pedido_id
 * @param {Boolean} param0.reset
 * @returns
 */
function CVTracking({
  variant = 'pedido' || 'devolucion',
  pedido_id = '',
  reset = false
}) {
  const [trackings, settrackings] = useState([]);
  const [status, setstatus] = useState('PENDING_PAY');
  const [idtracking, setidtracking] = useState('');
  const buyer = window.location.toString().includes('buyer');
  const variants = {
    pedido: {
      step1: 'Pedido',
      step4: 'Entregado'
    },
    devolucion: {
      step1: 'Solicitud',
      step4: 'Devolución'
    }
  };

  const titles = {
    step1:
      variant === 'devolucion'
        ? 'Devolución pendiente'
        : `${variants[variant].step1} confirmado`,
    step2: variant === 'devolucion' ? 'Entrega de producto' : `Procesado`,
    step3: variant === 'devolucion' ? 'Recepción del producto' : `En Camino`,
    step4:
      variant === 'devolucion'
        ? '¡Devolución exitosa !'
        : `${variants[variant].step4}`
  };

  const track_pedido = async () => {
    const result = await get_tracking_by_pedido(pedido_id);
    setstatus(result?.status || 'PENDING_PAY');
    setidtracking(result?.tracking?.remito || '');
    const statuses =
      result?.statuses?.length > 0 ? result?.statuses : defaultTrack;
    const messages = statuses?.sort((a, b) => {
      if (a.position > b.position) return 1;
      if (a.position < b.position) return -1;
      return 0;
    });
    const tracks = messages.map((item) => ({
      date: item?.fecha,
      time: item?.hora,
      text: item?.messages[buyer ? 'buyer' : 'seller'],
      active: item.active
    }));
    settrackings([...tracks]);
  };

  const track_devolucion = async () => {
    let result = await devolucion_by_id(pedido_id);

    if (result == null) {
      result = await devolucion_by_pedido_id(pedido_id);
    }

    setstatus(result?.status || 'PENDING_PAY');
    setidtracking(result?.tracking?.remito || '');
    const statuses =
      result?.statuses?.length > 0 ? result?.statuses : defaultTrack;
    const messages = statuses?.sort((a, b) => {
      if (a.position > b.position) return 1;
      if (a.position < b.position) return -1;
      return 0;
    });
    const tracks = messages.map((item) => ({
      date: item?.fecha,
      time: item?.hora,
      text: item?.messages[buyer ? 'buyer' : 'seller'],
      active: item.active
    }));
    settrackings([...tracks]);
  };

  const initdata = async () => {
    if (variant == 'devolucion') track_devolucion();
    if (variant == 'pedido') track_pedido();
  };

  useEffect(() => {
    if (pedido_id != '') initdata();
  }, [pedido_id, reset]);

  const optsStatus = { SENDED: 'PROCESSED', RETURNED: 'SENDED' };

  return trackings.length > 0 ? (
    <Box width='100%'>
      <CVTrackingStep
        titles={titles}
        variant={variant}
        estado={variant == 'devolucion' ? optsStatus[status] || status : status}
        trackings={trackings}
      />
      <CVLine
        titles={[`Tracking: ${idtracking}`]}
        fontSize='1rem'
        lineHeight='1px'
        color='green'
        backgroundColor='white'
      />
      <Flex justifyContent='center'>
        <CVTrackingTrack
          trackings={trackings}
          status={status}
          variant={variant}
        />
      </Flex>
    </Box>
  ) : (
    <Box>
      <CVButton isLoading={true}>Cargando...</CVButton>
    </Box>
  );
}

export default CVTracking;
