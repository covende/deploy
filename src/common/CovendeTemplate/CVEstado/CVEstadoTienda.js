export const CVEstadoTiendaStatus = {
  APPROVED: {
    value: 'APPROVED',
    text: 'Aprobado',
    color: 'green'
  },
  PENDING: {
    value: 'PENDING',
    text: 'Pendiente',
    color: 'yellow'
  },
  REJECTED: {
    value: 'REJECTED',
    text: 'Rechazado',
    color: 'red'
  }
};

export const CVEstadoTienda = (status) =>
  CVEstadoTiendaStatus[status] || {
    value: status,
    text: status,
    color: 'gray'
  };
