import SizeBox from '@/common/components/CustomComponent/SizeBox';
import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import { Tooltip } from '@chakra-ui/tooltip';
import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { RiEyeCloseLine, RiEyeFill } from 'react-icons/ri';
import {
  CVEDevDisableCancel,
  CVEDevDisableProcess
} from '../CVEstado/CVEstadoDevolucion';
import { COLORS } from '../CVThemes';

/**
 *
 * @param {Object} param0
 * @param {Boolean} param0.isOpen
 * @param {Function} param0.onClose
 * @param {Object} param0.acciones
 * @param {Function} param0.acciones.see
 * @param {Function} param0.acciones.process
 * @param {Function} param0.acciones.cancel
 * @param {String} param0.status
 * @param {String} param0.devolucion_id
 * @returns
 */
function CVActionsDevolucion({
  isOpen,
  acciones,
  status,
  devolucion_id,
  permissions
}) {
  return (
    <Flex alignItems='center'>
      {permissions.ver && (
        <Box
          color={COLORS[isOpen ? 'primary' : 'gray']}
          fontSize='1.5rem'
          className='actions'
          onClick={() => acciones.see()}>
          <Tooltip label='Ver Detalle'>
            <span>{isOpen ? <RiEyeCloseLine /> : <RiEyeFill />}</span>
          </Tooltip>
        </Box>
      )}
      <SizeBox />
      {permissions.crear && (
        <Button
          color={COLORS[isOpen ? 'primary' : 'gray']}
          fontSize='1.5rem'
          variant='link'
          disabled={CVEDevDisableProcess(status)}
          className='actions'
          onClick={() => {
            acciones.process(devolucion_id);
          }}>
          <Tooltip label='Confirmar recepción'>
            <span>
              <FaCheck />
            </span>
          </Tooltip>
        </Button>
      )}
      <SizeBox />
      {permissions.eliminar && (
        <Button
          color={COLORS[isOpen ? 'red' : 'gray']}
          fontSize='1.5rem'
          variant='link'
          disabled={CVEDevDisableCancel(status)}
          className='times'
          onClick={() => acciones.cancel(devolucion_id)}>
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

export default CVActionsDevolucion;
