import React from 'react';

export const CVEstadoProducto = (status = 'PENDING') => {
  let estados = {
    ALL: {
      value: '',
      text: 'Todos',
      color: 'green'
    },
    PENDING: {
      value: 'PENDING',
      text: 'Pendiente',
      color: 'lightGray'
    },
    IN_REVIEW: {
      value: 'IN_REVIEW',
      text: 'En Revisión',
      color: 'yellow'
    },
    APPROVED: {
      value: 'APPROVED',
      text: 'Aprobado',
      color: 'primary'
    },
    REJECTED: {
      value: 'REJECTED',
      text: 'Rechazado',
      color: 'red'
    },
    LOCKED: {
      value: 'REJECTED',
      text: 'Bloqueado',
      color: 'red'
    },
    RETURNED: {
      value: 'RETURNED',
      text: 'Retornado',
      color: 'lightGray'
    },
    ANNULLED: {
      value: 'ANNULLED',
      text: 'Anulado',
      color: 'lightGray'
    },
    FINISHED: {
      value: 'FINISHED',
      text: 'Finalizado',
      color: 'lightGray'
    },
    IN_DRAFT: {
      value: 'IN_DRAFT',
      text: 'En Borrador',
      color: 'boldGray'
    },
    ELIMINATED: {
      value: 'ELIMINATED',
      text: 'Eliminado',
      color: 'lightGray'
    }
  };
  return estados[status];
};
