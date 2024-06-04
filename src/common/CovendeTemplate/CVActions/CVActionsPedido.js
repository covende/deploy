import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';
import { FaShippingFast, FaTimes } from 'react-icons/fa';
import { RiEyeCloseLine, RiEyeFill } from 'react-icons/ri';
// import { BsBoxSeam, BsBoxSeamFill } from 'react-icons/bs';
import { BsBoxSeam } from 'react-icons/bs';

import {
  CVEPDisableCancel,
  CVEPDisableProcess
} from '../CVEstado/CVEstadoPedido';
import { COLORS } from '../CVThemes';

/**
 *
 * @param {Object} param0
 * @param {Boolean} param0.isOpen
 * @param {Function} param0.onClose
 * @param {Object} param0.acciones
 * @param {Function} param0.acciones.setIdpedido
 * @param {Function} param0.acciones.onOpen
 * @param {Function} param0.acciones.setpedido
 * @param {Function} param0.acciones.cancelapedido
 * @param {String} param0.status
 * @param {String} param0.pedido_id
 * @returns
 */
function CVActionPedido({
  isOpen,
  onClose,
  acciones,
  status,
  pedido_id,
  permit_cancelled,
  pedido,
  permisions = { ver: true, editar: true, crear: true, eliminar: true }
}) {
  // console.log({pedido_id})
  return (
    <Flex alignItems='center'>
      {permisions.ver && (
        <Box
          color={COLORS[isOpen ? 'primary' : 'gray']}
          fontSize='1.5rem'
          className='actions'
          onClick={() => onClose()}>
          <Tooltip label='Ver Detalle'>
            <span>{isOpen ? <RiEyeCloseLine /> : <RiEyeFill />}</span>
          </Tooltip>
        </Box>
      )}
      <SizeBox />
      {permisions.crear && (
        <Button
          color={COLORS[isOpen ? 'primary' : 'gray']}
          fontSize='1.5rem'
          variant='link'
          disabled={CVEPDisableProcess(status)}
          className='actions'
          onClick={() => {
            acciones.setIdpedido(pedido_id);
            acciones.onOpen();
          }}>
          {/* <Tooltip label='Procesar'> */}
          <Tooltip label='Preparar'>
            <span>
              {/* <FaShippingFast /> */}
              <BsBoxSeam />
            </span>
          </Tooltip>
        </Button>
      )}
      <SizeBox />
      {permisions.eliminar && (
        <Button
          color={COLORS[isOpen ? 'red' : 'gray']}
          fontSize='1.5rem'
          variant='link'
          disabled={!permit_cancelled}
          // disabled={CVEPDisableCancel(status)}
          className='times'
          onClick={() => {
            acciones.setpedido(pedido);
            acciones.cancelapedido(pedido_id);
          }}>
          <Tooltip label='Cancelar'>
            <span>
              <FaTimes />
            </span>
          </Tooltip>
        </Button>
      )}
    </Flex>
  );
}

export default CVActionPedido;
