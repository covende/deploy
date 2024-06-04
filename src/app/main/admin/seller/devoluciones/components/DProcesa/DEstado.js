import CVTracking from '@/common/CovendeTemplate/CVTracking';
import { Box } from '@chakra-ui/layout';
import React from 'react';

function DEstado({ devolucion, setdevolucion, iddevolucion, reset }) {
  const status = devolucion?.status != 'X' ? devolucion?.status : 'PENDING';
  return (
    <Box>
      <CVTracking
        variant='devolucion'
        pedido_id={iddevolucion}
        reset={reset}
        // trackings={devolucion?.estado?.statuses}
        // idtracking={devolucion?.estado?.idtracking}
        // status={status}
      />
    </Box>
  );
}

export default DEstado;
