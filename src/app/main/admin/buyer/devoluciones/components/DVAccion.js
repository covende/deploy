import CVSelectButton from '@CVTemplate/core/CVSelectButton';
import React from 'react';
import { useHistory } from 'react-router-dom';

function DVAccion({ devolucion }) {
  const history = useHistory();

  return (
    <CVSelectButton
      actions={[
        {
          action: () =>
            history.push(
              `/buyer/devoluciones/${devolucion.pedido_id}/${devolucion.devolucion_id}/consult`
            ),
          label: 'Ver detalles'
        },
        {
          action: () =>
            history.push(
              `/buyer/devoluciones/${devolucion.pedido_id}/${devolucion.devolucion_id}/consult`
            ),
          label: 'Cancelar devolución',
          disabled: true
        },
        {
          action: () =>
            history.push(
              `/buyer/devoluciones/${devolucion.pedido_id}/${devolucion.devolucion_id}/consult`
            ),
          label: 'Marcar como enviado',
          disabled: !(devolucion?.request_status == 'APPROVED')
        },
        {
          action: () =>
            history.push('/buyer/reembolso/devolution/' + devolucion?.idpedido),
          label: 'Solicitar reembolso',
          disabled: !(devolucion?.status == 'APPROVED')
        }
      ]}
    />
  );
}

export default DVAccion;
